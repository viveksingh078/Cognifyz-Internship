const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes/api");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();
const app = express();

// Middleware
app.use(helmet()); // Adds security headers
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api", apiRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
