import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import AboutUs from "../models/aboutUs.js";
import Contacts from "../models/contact.js";
import Event from "../models/event.js";
import Facilities from "../models/facilities.js";
import clubMain from "../models/clubMain.js";
import homepage from "../models/general.js";
import announcement from "../models/announcement.js";

// The reverse proxy in front of this service strips the '/sports-board/api'
// prefix from the REQUEST before forwarding it here, so Express itself
// always receives unprefixed paths (e.g. '/home', '/admin') in both dev
// and prod. That's the path we must mount the admin router at.
//
// But AdminJS also bakes `rootPath`/`loginPath`/`logoutPath` directly into
// things the BROWSER acts on: the login <form action>, res.redirect()
// targets, the auth cookie, and every URL its client-side bundle builds
// for API calls and assets. Those need the prefix the proxy stripped,
// because the browser navigates by the real external URL, not by
// whatever Express happened to receive after stripping. Using the
// unprefixed value there (as before) made the browser get redirected to
// '/admin/login' at the domain root - which the proxy has no route for -
// hence "Cannot GET /admin" and, once mounting was fixed, a 404 on login.
//
// So: two paths, two different jobs.
export const ADMIN_MOUNT_PATH = process.env.ADMIN_MOUNT_PATH || '/admin';
const PUBLIC_ADMIN_ROOT = process.env.NODE_ENV === 'development'
  ? ADMIN_MOUNT_PATH
  : `/sports-board/api${ADMIN_MOUNT_PATH}`;
// Same proxy-prefix reasoning as PUBLIC_ADMIN_ROOT above, but for the custom
// assets below — they're served from a plain express.static mount (see
// index.js), not from the admin router, so they sit outside ADMIN_MOUNT_PATH.
const PUBLIC_API_ROOT = process.env.NODE_ENV === 'development'
  ? ''
  : '/sports-board/api';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// Validate required environment variables
if (!DEFAULT_ADMIN.email || !DEFAULT_ADMIN.password) {
  throw new Error('Admin email and password must be set in environment variables');
}

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN;
  }
  return null;
};

const adminOptions = {
  resources: [
    AboutUs, Event, Facilities, announcement, clubMain,
    {
      resource: Contacts,
      // The schema field is still `description`; relabeled here since admins
      // use it to record the contact's college ID / college mail.
      options: {
        properties: {
          description: { label: 'College ID/ Mail' },
          // An empty club is what marks a contact as core team (see the
          // schema comment on this field) — flag that in the label itself
          // so it isn't mistaken for a required field.
          club: { label: 'Club (Only for club secretaries)' },
        },
      },
    },
    {
      resource: homepage,
      // The Leadership section's field names don't say what they hold — label
      // and describe them so the chairman/GS fields aren't mistaken for missing.
      options: {
        properties: {
          chairmanname: { label: 'Chairman Name' },
          chairmanimgurl: { label: 'Chairman Image URL', description: 'Absolute URL to the chairman\'s photo.' },
          chairmandescription: { label: 'Chairman Department', description: 'e.g. "Mechanical Engineering". Shown under the chairman\'s name.' },
          aboutchairman: { label: 'Chairman Quote', description: 'Short pull-quote shown under "Message from the Chairman".' },
          gensecname: { label: 'General Secretary Name' },
          gensecimg: { label: 'General Secretary Image URL', description: 'Absolute URL to the general secretary\'s photo.' },
          gensecdescription: { label: 'General Secretary Department', description: 'e.g. "Mechanical Engineering". Shown under the GS\'s name.' },
          aboutgensec: { label: 'General Secretary Quote', description: 'Short pull-quote shown under "Message from the General Secretary".' },
        },
      },
    },
  ],
  rootPath: PUBLIC_ADMIN_ROOT,
  loginPath: PUBLIC_ADMIN_ROOT + "/login",
  logoutPath: PUBLIC_ADMIN_ROOT + "/logout",
  branding: {
    companyName: 'Sports Board Admin',
    logo: `${PUBLIC_API_ROOT}/admin-assets/logo.jpg`,
    withMadeWithLove: false,
    theme: {
      // Threads IBM Plex Sans through every styled-component in the design
      // system (inputs, buttons, table, drawer...) — `font` is a top-level
      // key on the theme object, same as `colors` (see @adminjs/design-
      // system's theme.ts default: `export const font = '\'Roboto\', ...'`,
      // and e.g. breadcrumbs.tsx reading `theme.font` directly). This is
      // the primary fix; admin-refinements.css's own type block calls
      // itself "belt-and-braces" — it only backstops the few places (native
      // inputs/buttons, our own injected controls using `font-family:
      // inherit`) that don't read from the theme.
      font: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      colors: {
        primary100: '#4F46E5',
        primary80: '#6366F1',
        primary60: '#818CF8',
        primary40: '#A5B4FC',
        primary20: '#C7D2FE',
      }
    }
  },
  // AdminJS's default locale nests every string under the language code
  // (see locale/en/translation.json — `en.messages.*`, `en.components.*`),
  // and getLocales() (backend/utils/options-parser/options-parser.ts) merges
  // this config into that same shape. A flat `translations.messages...`
  // (no `en` level) merges into a path nothing reads, so it's silently
  // ignored — which is why the login page still showed AdminJS's stock
  // "Welcome to AdminJS..." copy despite `loginWelcome` being set below.
  // `Login.welcomeHeader`/`welcomeMessage` are the keys the login page
  // actually renders (see frontend/components/login/index.tsx); nesting
  // both fixes it.
  locale: {
    language: 'en',
    translations: {
      en: {
        messages: {
          loginWelcome: 'Sports Board Administration',
        },
        components: {
          Login: {
            welcomeHeader: 'Sports Board Administration',
            welcomeMessage: 'Manage clubs, events, facilities, announcements and the public site content for the Students’ Sports Board, IIT Guwahati.',
          },
        },
      },
    },
  },
  // Adds a collapse/expand toggle to the sidebar, a List-page per-resource
  // column-visibility picker plus truncation of overflowing text cells, and
  // a spacing/typography refinement pass over the whole panel — AdminJS has
  // none of these built in. See admin_panel/public/admin-sidebar.{css,js},
  // admin-list.{css,js} and admin-refinements.css for the behaviour.
  //
  // Load order matters: the Google Font must be requested before anything
  // tries to render in it, and admin-refinements.css corrects values the
  // other two stylesheets set, so it loads last.
  assets: {
    styles: [
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono&display=swap',
      `${PUBLIC_API_ROOT}/admin-assets/admin-sidebar.css`,
      `${PUBLIC_API_ROOT}/admin-assets/admin-list.css`,
      `${PUBLIC_API_ROOT}/admin-assets/admin-refinements.css`,
    ],
    scripts: [
      `${PUBLIC_API_ROOT}/admin-assets/admin-sidebar.js`,
      `${PUBLIC_API_ROOT}/admin-assets/admin-list.js`,
    ],
  },
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: process.env.COOKIE_NAME,
  cookiePassword: process.env.COOKIE_PASSWORD,
});
try {
  admin.watch();
} catch (err) {
  console.log(err);
}

export { admin, adminRouter };
