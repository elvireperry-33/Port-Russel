# Port de Plaisance Russell

API REST réalisée avec Node.js, Express et MongoDB dans le cadre de ma formation de développeuse web.

## Fonctionnalités

- Authentification des utilisateurs
- Gestion des catways
- Gestion des réservations
- Gestion des utilisateurs
- Dashboard
- Documentation de l'API

## Installation
1. Cloner le dépôt GitHub :
git clone http://github.com/elvireperry-33/Port-Russell.git
2. Installer les dépendances :
nmp install
3. Créer un fichier '.env' à la racine du projet.
Ajouter la viariable suivante dans le fichier '.env' :
MONGO_URI=votre_uri_de_connexion_mongodb
4. lancer l'application : 
nmp start
5. Ouvrir l'application dans le navigateur :
http://localhost:3000
## compte de démonstration
Email : elvire@test.com
Mot de passe : test1234
## Technologie utilisées
- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Git et GitHub
## Routes de L'API
### Catways
- GET /catways : liste des catways
- GET /catways/:id : détail d'un catway
- POST /catways : ajouter un catway
- PUT /catways/:id : modifier un catway
- DELETE /catways/:id : supprimer un catway
### Réservations
- GET /reservations : liste des réservations
- POST /reservations : ajouter une réservation
- PUT /reservations/:id : modifier une réservation
- DELETE /reservations/:id : supprimer une réservation
### Utilisateurs
- GET /users : liste des utilisateurs
- GET /users/:email : afficher un utilisateur
- POST /users : ajouter un utilisateur
- PUT /users/:email : modifier un utilisateur
- DELETE /users/:email : supprimer un utilisateur
### Authentification
- POST /auth/login : connecter un utilisateur
- GET /auth/logout : déconnecter un utilisateur
## Documentation de l'API
La documentation complète de l'API est accessible depuis l'application :
https://port-russel-oe3e.onrender.com/documentation.html
## Application en ligne
L'application est déployée sur Render :
https://port-russel-oe3e.onrender.com/
## Dépôt GitHub
Le code source du projet est disponible sur GitHub :
https://github.com/elvireperry-33/Port-Russel

