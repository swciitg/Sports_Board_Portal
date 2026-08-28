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
import TeamMember from "../models/teamMember.js";
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
  resources: [AboutUs, Contacts, Event, Facilities, TeamMember,announcement, clubMain,homepage],
  rootPath: PUBLIC_ADMIN_ROOT,
  loginPath: PUBLIC_ADMIN_ROOT + "/login",
  logoutPath: PUBLIC_ADMIN_ROOT + "/logout",
  branding: {
    companyName: 'Sports Board Admin',
    logo: false,
    withMadeWithLove: false,
    theme: {
      colors: {
        primary100: '#4F46E5',
        primary80: '#6366F1',
        primary60: '#818CF8',
        primary40: '#A5B4FC',
        primary20: '#C7D2FE',
      }
    }
  },
  locale: {
    language: 'en',
    translations: {
      messages: {
        loginWelcome: 'Sports Board Administration' // Custom login message
      }
    }
  }
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
