

const form = document.getElementById('signupForm');
const errors = form.querySelectorAll('.error');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errors.forEach(el => el.textContent = '');

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const sexe = document.querySelector("input[name='sexe']:checked")?.value;
  const school = document.getElementById('school').value.trim();
  const filiere = document.getElementById('filiere').value.trim();
  const naissance = document.getElementById('naissance').value;

  let valid = true;
  if (!sexe) {
    form.querySelector('fieldset + .error').textContent = 'Please select gender';
    valid = false;
  }
  if (!email) { document.getElementById('emailError').textContent = 'Email requis'; valid = false; }
  if (!password) { document.getElementById('passwordError').textContent = 'Password requis'; valid = false; }
  if (!nom) { document.getElementById('nomError').textContent = 'Last Name requis'; valid = false; }
  if (!prenom) { document.getElementById('prenomError').textContent = 'First Name requis'; valid = false; }
  if (!school) { document.getElementById('school').nextElementSibling.textContent = 'School requis'; valid = false; }
  if (!filiere) { document.getElementById('filiere').nextElementSibling.textContent = 'Field of study requis'; valid = false; }
  if (!naissance) { document.getElementById('naissance').nextElementSibling.textContent = 'Birth date requis'; valid = false; }
  if (!valid) return;

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, email, password, sexe, school, filiere, naissance })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Inscription réussie !');
      window.location.href = '/signin.html';
    } else {
      document.getElementById('emailError').textContent = data.error;
    }
  } catch (err) {
    console.error(err);
    alert('Erreur serveur');
  }
});

