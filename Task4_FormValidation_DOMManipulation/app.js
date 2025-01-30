const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to render the registration form
app.get('/', (req, res) => {
  // Render the form with empty values initially
  res.render('form', { errors: [], formData: {} });
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;

  // Validation logic
  const errors = [];
  if (!username) errors.push('Username is required.');
  if (!email) errors.push('Email is required.');
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters.');
  }

  // If there are errors, re-render the form with error messages and user data
  if (errors.length > 0) {
    return res.render('form', { errors, formData: req.body });
  }

  // If no errors, render the dynamic page with the submitted data
  res.render('dynamic', { username, email });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
