document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token); // Stocke le token
            window.location.href = 'dashboard.html'; // Redirige vers le tableau de bord
        } else {
            document.getElementById('loginMessage').innerText = data.message || 'Erreur de connexion';
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});
