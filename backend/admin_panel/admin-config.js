import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import AboutUs from "../models/aboutUs.js";
import Club from "../models/club.js";
import Contacts from "../models/contact.js"; 
import Event from "../models/event.js";
import Facilities from "../models/facilities.js";
import TeamMember from "../models/teamMember.js";
import clubMain from "../models/clubMain.js";

const ADMINPANELROOT = "/admin";

const DEFAULT_ADMIN = {
  email: "g.avinash@iitg.ac.in",
  password: "admin",
};

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
    AboutUs,
    Club,
    Contacts,
    Event,
    Facilities,
    TeamMember,
    clubMain
  ],
  rootPath: ADMINPANELROOT,
  loginPath: ADMINPANELROOT + "/login",
  logoutPath: ADMINPANELROOT + "/logout"
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: "sessionsecret",
}, null, {
  resave: false,
  saveUninitialized: true,
  secret: "sessionsecret",
});

export { admin, adminRouter };