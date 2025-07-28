const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');
const strengthMessage = document.getElementById('loginStrengthMessage');
const submitButton = document.getElementById('loginSubmitButton');

function validateLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const result = zxcvbn(password);
  const score = result.score;
  const hasNumber = /\d/.test(password);

  let message = '';

  if (!email) {
    message = 'Email is required.';
  } else if (!password) {
    message = 'Password is required.';
  } else if (!hasNumber) {
    message = 'Password must include at least one number.';
  } else if (score < 3) { // score 3 means "good" or higher
    message = 'Password strength is too weak. Add more characters, numbers, or symbols.';
  }

  if (message) {
    strengthMessage.textContent = message;
    strengthMessage.style.color = 'red';
    submitButton.disabled = true;
  } else {
    strengthMessage.textContent = 'Ready to log in.';
    strengthMessage.style.color = 'green';
    submitButton.disabled = false;
  }
}

// Attach input event listeners for real-time validation
[emailInput, passwordInput].forEach(input => {
  input.addEventListener('input', validateLogin);
});

// On form submit
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  validateLogin();

  if (submitButton.disabled) {
    alert('Please fix the errors before logging in.');
    return;
  }

  // 🔗 --- Insert your backend login API call here ---
  // Example:
  /*
  try {
    const response = await fetch('https://your-backend-api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message || 'Unknown error'}`);
      return;
    }

    const data = await response.json();
    alert('Login successful!');
    // TODO: Handle successful login (redirect, token save, etc.)
  } catch (error) {
    alert('Network error: Unable to login at this time.');
  }
  */
});