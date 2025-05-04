// frontend/js/login.js
// Gère la soumission du formulaire de connexion et la redirection

document.addEventListener('load', () => {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Affiche le message d'erreur retourné par le serveur
        alert(data.message || 'Échec de la connexion');
        return;
      }

      // Enregistrer le token JWT dans le localStorage
      localStorage.setItem('token', data.token);

      // Rediriger vers la page examen.html
      window.location.href = '/examen.html';
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      alert('Erreur réseau. Veuillez réessayer.');
    }
  });
});

















