import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { adminRouter, admin } from "./admin_panel/admin-config.js";

// Initialize dotenv to load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const url = process.env.MONGO_URI;

// Debug: Check if MONGO_URI is loaded
console.log("MONGO_URI:", url);

// Connect to MongoDB
mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
console.log(admin.options.rootPath);
console.log(adminRouter);

// Middleware for admin router
app.use(admin.options.rootPath, adminRouter);

// Middleware to parse JSON
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
