const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 TaskFlow API Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Task Manager API Running 🚀");
});
