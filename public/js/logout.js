document.querySelector('.logout-button').addEventListener('click', async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log("Logging out...")

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to log out');
    }
});