const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public")); // Serve static files (CSS/JS)
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("form");
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    res.render("success", { name, email });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
