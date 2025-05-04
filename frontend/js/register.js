 // Gestion de l’envoi du formulaire d’inscription
document.getElementById('signup_btn').addEventListener('submit', function(e) {
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
    id: 23,
    email:    email,
    password: password,
    nom:      nom,
    prenom:   prenom,
    sexe:     sexe,
    school:   school,
    filiere:  filiere,
    naissance: naissance,
  })
    .then(response => {
     

      // 2. Réinitialisation du formulaire
      e.target.reset();


      // 4. Notification de succès
      alert('Client ajouté avec succès !');
    })
    .catch(error => {
      console.error('Erreur lors de l’ajout du client :', error);
      alert('Une erreur est survenue lors de l’inscription. Veuillez réessayer.');
    });
});
