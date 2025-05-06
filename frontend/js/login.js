// frontend/js/login.js
// Gère la soumission du formulaire de connexion et la redirection

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les champs et les divs d'erreur
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Réinitialiser les messages d'erreur
    emailError.textContent = '';
    passwordError.textContent = '';

    // Validation des champs
    let hasError = false;
    if (!email) {
        emailError.textContent = 'Veuillez entrer votre email.';
        hasError = true;
    }
    if (!password) {
        passwordError.textContent = 'Veuillez entrer votre mot de passe.';
        hasError = true;
    }
    if (hasError) return;

    try {
        const response = await fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // Afficher les erreurs spécifiques renvoyées par le serveur
            if (data.message) {
                if (data.message.includes('Utilisateur')) {
                    emailError.textContent = data.message; // Affiche l'erreur dans le div emailError
                } else if (data.message.includes('Mot de passe')) {
                    passwordError.textContent = data.message; // Affiche l'erreur dans le div passwordError
                } else {
                    emailError.textContent = 'Erreur : ' + data.message; // Message générique
                }
            } else {
                emailError.textContent = 'Une erreur est survenue.';
            }
            return;
        }

        // Enregistrer le token JWT dans le localStorage
        localStorage.setItem('token', data.token);

        // Rediriger vers la page transition.html
        window.location.href = '/transition.html';
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        emailError.textContent = 'Erreur réseau. Veuillez réessayer.';
    }
});

















