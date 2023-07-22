document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signup-form');
    
    if(signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.querySelector('#username-input').value.trim();
            const password = document.querySelector('#password-input').value.trim();

            if (username && password) {
                const response = await fetch('/api/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/login');
                } else {
                    alert('Failed to sign up');
                }
            }
        });
    } else {
        console.error('Signup form not found');
    }
});