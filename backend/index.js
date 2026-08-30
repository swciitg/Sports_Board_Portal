import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
