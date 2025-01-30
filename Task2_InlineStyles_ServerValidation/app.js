const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Temporary in-memory storage
const submissions = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form
app.get('/', (req, res) => {
    res.render('form', { error: null });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age } = req.body;

    // Server-side validation
    if (!name || !email || !age) {
        return res.render('form', { error: 'All fields are required!' });
    }

    if (isNaN(age) || age < 1) {
        return res.render('form', { error: 'Age must be a valid positive number!' });
    }

    // Save data temporarily
    submissions.push({ name, email, age });

    // Render success page
    res.render('success', { name, email, age });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
