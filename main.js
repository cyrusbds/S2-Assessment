// Function to switch frame
function toggleForms(formToShow) {
    const signup = document.getElementById('signup');
    const signin = document.getElementById('signin');

    if (formToShow === 'signup') {
      signup.style.display = 'flex';
      signin.style.display = 'none';
    } else if (formToShow === 'signin') {
      signup.style.display = 'none';
      signin.style.display = 'flex';
    }
  }
// Signup Functionality
document.getElementById('signup-btn').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (name && email && password) {
        try {
            const response = await fetch('http://localhost:4000/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sign Up Successful! Redirecting to Login page...');
                toggleForms('signin');
            } else {
                alert(data.message || 'Sign Up Failed!')
            }
        } catch (err) {
            alert('An error occurred. Please try again later.')
        }
    } else {
        alert('All fields are required!')
    }
});

// Login Functionality
document.getElementById('signin-btn').addEventListener('click', async () => {
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Welcome back, ${data.user.name}!`);
                localStorage.setItem('user', JSON.stringify(data));

                // Redirect to the home page
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Invalid email or password.')
            }
        } catch (err) {
            alert('An error occurred. Please try again later.')
        }
    } else {
        alert('All fields are required!')
    }
});
