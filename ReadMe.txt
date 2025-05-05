                    plateforme examen en ligne
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
