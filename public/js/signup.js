document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signup-form');
    
    if(signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.querySelector('#username-input').value.trim();
            console.log(`username: ${username}`)
            const password = document.querySelector('#password-input').value.trim();
            console.log(`password: ${password}`)
            if (username && password) {
                const response = await fetch('/api/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log(response);
                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to sign up'+username+':'+password);
                }
            }
        });
    } else {
        console.error('Signup form not found');
    }
});