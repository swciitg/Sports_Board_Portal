import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import AboutUs from "../models/aboutUs.js";
import Contacts from "../models/contact.js";
import Event from "../models/event.js";
import Facilities from "../models/facilities.js";
import TeamMember from "../models/teamMember.js";
import clubMain from "../models/clubMain.js";
import homepage from "../models/general.js";
import announcement from "../models/announcement.js";

const API_BASE = process.env.NODE_ENV === 'development' ?  (process.env.API_BASE || '') : '/sports-board/api';
const ADMINPANELROOT = `${API_BASE}/admin`;

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
  rootPath: ADMINPANELROOT,
  loginPath: ADMINPANELROOT + "/login",
  logoutPath: ADMINPANELROOT + "/logout",
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
