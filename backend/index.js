import dotenv from "dotenv";
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import { adminRouter, admin } from "./admin_panel/admin-config.js";
import cors from "cors";

// Initialize dotenv to load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URI ;


// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  // console.log("Database connected");
});

const app = express();
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(admin.options.rootPath, adminRouter);
// Apply CORS Middleware
app.use(cors(corsOptions));
// Middleware to parse incoming requests
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);
// Use user and admin routers


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
