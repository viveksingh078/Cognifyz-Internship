document.getElementById('form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();

    if (!name || !email || !age) {
        alert('All fields are required!');
        e.preventDefault(); // Prevent form submission
        return false;
    }

    if (isNaN(age) || age < 1) {
        alert('Age must be a valid positive number!');
        e.preventDefault(); // Prevent form submission
        return false;
    }

    return true; // Allow form submission
});
