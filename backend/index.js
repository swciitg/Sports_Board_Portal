import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import { admin, adminRouter, ADMIN_MOUNT_PATH } from "./admin_panel/admin-config.js"; // Removed unnecessary import
import cors from "cors";
import session from "express-session";
import { fileURLToPath } from 'url';
import path from 'path';
import uploadRoutes from "./routes/upload.route.js";
import authRoutes from "./routes/auth.routes.js";
// Initialize dotenv to load environment variables (quiet: suppress dotenv v17 startup tips)
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URI;
console.log(url);

// Connect to MongoDB
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.use(ADMIN_MOUNT_PATH, adminRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
//   optionsSuccessStatus: 200, // Legacy browsers
// };

// Apply CORS Middleware
app.use(cors());

// Body parsers (Express's built-in parsers replace the standalone body-parser package)
app.use(express.json());
app.use('/', router);
app.use('/image', authRoutes);
app.use('/upload', uploadRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
