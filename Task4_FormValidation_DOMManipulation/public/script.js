document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');

  // Error message elements
  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Password criteria
  const criteria = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
    length: /.{8,}/,
  };
  const criteriaElements = {
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special'),
    length: document.getElementById('length'),
  };

  // Validation functions
  const validateUsername = () => {
    if (!usernameInput.value.trim()) {
      usernameError.textContent = 'Username is required.';
      return false;
    }
    usernameError.textContent = '';
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Enter a valid email address.';
      return false;
    }
    emailError.textContent = '';
    return true;
  };

  const validatePassword = () => {
    const value = passwordInput.value;
    let isValid = true;

    for (const key in criteria) {
      if (criteria[key].test(value)) {
        criteriaElements[key].classList.add('valid');
        criteriaElements[key].classList.remove('invalid');
      } else {
        criteriaElements[key].classList.add('invalid');
        criteriaElements[key].classList.remove('valid');
        isValid = false;
      }
    }

    passwordError.textContent = isValid
      ? ''
      : 'Password must meet the criteria above.';
    return isValid;
  };

  // Attach event listeners
  usernameInput.addEventListener('input', validateUsername);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  form.addEventListener('input', () => {
    const isFormValid =
      validateUsername() && validateEmail() && validatePassword();
    submitBtn.disabled = !isFormValid;
  });
});
