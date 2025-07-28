const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('signupUsername');
const emailInput = document.getElementById('signupEmail');
const passwordInput = document.getElementById('signupPassword');
const confirmInput = document.getElementById('signupConfirm');
const strengthMessage = document.getElementById('passwordStrength');
const submitButton = document.getElementById('submitButton');

function validateForm() {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  const result = zxcvbn(password);
  const score = result.score; // 0 (very weak) to 4 (strong)
  const hasNumber = /\d/.test(password);

  let message = '';

  if (!username) {
    message = 'Username cannot be empty.';
  } else if (!email) {
    message = 'Email cannot be empty.';
  } else if (!password) {
    message = 'Password cannot be empty.';
  } else if (!hasNumber) {
    message = 'Password must include at least one number.';
  } else if (password !== confirmPassword) {
    message = 'Passwords do not match.';
  } else if (score < 3) { // score < 3 is "fair" or below
    message = 'Password strength is too weak. Add more characters, numbers, or symbols.';
  }

  if (message) {
    strengthMessage.textContent = message;
    strengthMessage.style.color = 'red';
    submitButton.disabled = true;
  } else {
    strengthMessage.textContent = 'All fields valid. Ready to sign up.';
    strengthMessage.style.color = 'green';
    submitButton.disabled = false;
  }
}

// Attach input event listeners for live validation
[usernameInput, emailInput, passwordInput, confirmInput].forEach(input => {
  input.addEventListener('input', validateForm);
});

// On form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  validateForm();

  if (submitButton.disabled) {
    alert('Please fix errors before submitting.');
    return;
  }

  // 🔗 --- Insert your backend signup API call here ---
  // Example:
  /*
  try {
    const response = await fetch('https://your-backend-api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Signup failed: ${errorData.message || 'Unknown error'}`);
      return;
    }

    const data = await response.json();
    alert('Signup successful! Please log in.');
    // TODO: redirect or clear form, etc.
  } catch (error) {
    alert('Network error: Unable to sign up at this time.');
  }
  */
});