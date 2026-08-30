import dotenv from "dotenv";
import express from "express";
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

const app = express();
app.use(ADMIN_MOUNT_PATH, adminRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'uploads')));
// Custom AdminJS panel assets (see admin_panel/admin-config.js's `assets` option).
app.use('/admin-assets', express.static(path.join(__dirname, 'admin_panel/public')));
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

// Catch-all 404 — must stay LAST, after every route mount above, so it only
// fires when nothing else (including AdminJS's own router and the specific
// missing-by-id 404s in club/event controllers) matched. This is an API
// backend, not a browser-facing page, so it always answers markdown
// regardless of what the client's Accept header asks for.
app.use((req, res) => {
  res.status(404);
  res.type('text/markdown; charset=utf-8');
  res.send(
    `# Not found\n\n` +
    `The endpoint \`${req.originalUrl}\` does not exist on this API.\n\n` +
    `Go to [Sports Board, IIT Guwahati](https://swc.iitg.ac.in/sports-board/).\n`
  );
});

export default app;
