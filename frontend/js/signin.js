const form = document.getElementById('loginForm');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

form.addEventListener('submit', async e => {
  e.preventDefault();
  emailError.textContent = '';
  passwordError.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    if (!email) emailError.textContent = 'Email requis';
    if (!password) passwordError.textContent = 'Mot de passe requis';
    return;
  }

  try {
    const ping = await fetch('/api/ping');
    if (!ping.ok) throw new Error('Serveur hors ligne');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {//reussite

      localStorage.setItem('authUser', JSON.stringify(data.user));
      alert(`Bienvenue ${data.user.nom} !`);
      window.location.href = '/transition.html';


    } else if (res.status === 401) {
      passwordError.textContent = 'Identifiants incorrects';
    } else {
      emailError.textContent = data.error || 'Erreur';
    }

  } catch (err) {
    console.error(err);
    passwordError.textContent = err.message;
  }
});