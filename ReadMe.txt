        Guide d’utilisation de la plateforme d’examen en ligne

Prérequis : Node.js version 14 ou supérieure, npm, Docker et Docker Compose installés, connexion Internet.

                    Installation et démarrage :
-Cloner le dépôt avec git:
    git clone https://github.com/projet-JS/project_js.git
-accéder au dossier:
    cd online-exam-platform
-lancer « docker compose up -d » pour démarrer MongoDB et Mongo Express:
    docker compose up -d
-se rendre ensuite dans le dossier backend, 
-exécuter « npm install » puis « node server.js »:
    cd backend
    npm install
    node server.js
Le serveur écoute sur le port 3000.
            
                    Fonctionnement
Inscription :
-Ouvrir [http://localhost:3000/register.html] dans un navigateur, 
-renseigner tous les champs demandés 
    (email, mot de passe, nom, prénom, date de naissance, sexe, établissement, filière) 
-puis cliquer sur « Créer un compte ». 
En cas de succès, redirection vers la page de transition.

Connexion :
Ouvrir [http://localhost:3000] ou login.html, 
-saisir l’email et le mot de passe, 
-cliquer sur « Se connecter ». 
En cas de succès, redirection vers la page de transition.

Page de transition :
Deux choix possibles : 
--Pass an Exam pour passer un examen existant en saisissant le lien de celui-ci
--ou Create an Exam pour créer un nouvel examen.

Création d’examen :
Apres le choix 'Create an Exam' dans la page transition
Remplir le titre de l’examen, la description et le public visé. 
    -Utiliser le bouton + Add Question pour ajouter des questions
    -Preview pour prévisualiser 
    -Et enfin Finish pour terminer et enregistrer l’examen.

Passage d’examen :
Après avoir cliqué sur Pass an Exam dans la page transition, 
Sasisir le lien d'examen et cliquer sur le bouton commencer:
Le timer et le scoring se lancent automatiquement,
Les questions se presentent une a une

NB: Autrement, Juste saisir le lien d'examen dans une barre et recherche et tout se fear automatiquement
jusqu'au passge d'examen

                   
                   
                Presentation des differentes pages:
register.html:
La page qui montre la page d'inscription et gere l'inscription(creation  de compte) 
redirige vers transition.html pour le choix de creer exam ou passer exam

login.html:
La page qui 
-montre la connexion 
-gere la verification de compte 
-connecte l'utilisateur
apres, cette page est masqué et la section creer exam/passer exam s'affiche 
par ce choix , ya redirection  vers la page examen ou generation de la page passer exam

examen.html:
-presente la page de creation d'examen 
-gere les operation d'ajout , modification, suppression des questions, de leurs reponses et de tous les autres elements

transition.html: added cause of clarity of code
-presente la page de selection de creation d'examen ou de creation dun quelconque
-gere la suite selon le choix de l'utilisateur 

TOUTES ces pages on leur CSS et JS 
En plus de ca,on:
--node-modules: contient les modules necessaires: express, mongoose,cors,....
--docker-compose: contient les configurations necessaires pour Docker
--Le BACKEND contenant notamment SERVER.JS notre cher server automone qui sert les pages, gere les requetes et les succes et erreurs




Gestion des erreurs :
Les erreurs de formulaire et d’authentification s’affichent sous forme d’alertes et dans la console. 
En cas d’erreur serveur, consulter la console du navigateur et les logs dans server.js.

Personnalisation et extension :
Modifier les fichiers CSS (style.css, login.css, transition.css, examen.css) et JS (register.js, login.js, transition.js, examen.js) selon vos besoins. 
Ajouter ou adapter des routes dans server.js pour étendre l’API.

Pour toute question, ouvrir une issue sur le dépôt GitHub ou contacter l’équipe de développement.


MERCI, ClyElizer!