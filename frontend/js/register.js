  // Gestion de l’envoi du formulaire d’inscription
document.getElementById('signupForm').addEventListener('submit', (e)=> {
  e.preventDefault();

  // Lecture des valeurs saisies
  const email     = document.getElementById('email').value.trim();
  const password  = document.getElementById('password').value;
  const nom       = document.getElementById('nom').value.trim();
  const prenom    = document.getElementById('prenom').value.trim();
  const sexe      = document.querySelector("input[name='sexe']:checked")?.value || '';
  const school    = document.getElementById('school').value.trim();
  const filiere   = document.getElementById('filiere').value.trim();
  const naissance = document.getElementById('naissance').value;      // format YYYY‑MM‑DD


//
  // Pour debug
  console.log(email);
  console.log(password);
  console.log(nom, prenom, sexe, school, filiere, naissance);


  // Envoi de la requête POST
  axios.post('http://localhost:3000/users', {
    email:        email,
    password:     password,
    nom:          nom,
    prenom:       prenom,
    naissance:    naissance,
    sexe:         sexe,
    etablissement: school, 
    filiere:       filiere
  })
    .then(response => {
     
    // Notification de succès et redirection
    alert(`Compte créé avec succès !\nBienvenue ${nom} ${prenom}`);
    e.target.reset();
    window.location.href = './transition.html';
  })
    .catch(error => {
      console.error('Erreur lors de la creation du compte:', error);
      alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    });
});
