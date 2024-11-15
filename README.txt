Documentation de l'API - Port de Plaisance
Vue d'ensemble
Cette API permet de gérer les utilisateurs, les catways (pontons) et les réservations dans un port de plaisance. Elle offre des fonctionnalités pour créer, modifier, afficher et supprimer des utilisateurs, des catways et des réservations.


URL de base : http://localhost:3000

Technologies Utilisées
Node.js et Express pour construire l'API
MongoDB pour stocker les données des utilisateurs, des catways et des réservations.
JWT (JSON Web Token) pour l'authentification.
Structure des Routes Principales
Ressource	        Méthode	             Endpoint	                    Description
Utilisateurs	      PUT	            /users/add	                Crée un nouvel utilisateur
Utilisateurs	      PATCH	            /users/:id	        Modifie les informations d’un utilisateur
Utilisateurs	     DELETE	            /users/:id	                Supprime un utilisateur
Catways	              POST	            /catways	                Crée un nouveau catway
Catways	              PUT	            /catways/:id	        Modifie les informations d’un catway
Catways	             DELETE	            /catways/:id	            Supprime un catway
Réservations	      POST	       /reservations/:catwayNumber	    Crée une réservation sur un catway
Réservations	      GET	            /reservations	    Affiche la liste de toutes les réservations

Tutoriel

Pré-requis
Node.js (v14 ou plus récent) et MongoDB doivent être installés.
Cloner le dépôt et installer les dépendances avec la commande : npm install
Lancer le serveur
S'assurer que MongoDB est en cours d’exécution et que les variables d'environnement (comme JWT_SECRET) sont configurées dans un fichier .env.

Lancer le serveur avec npm start .

Authentification
Créer un utilisateur avec la route /users/add .
Ce connecter avec /users/login pour obtenir un token JWT.
Utiliser le token JWT pour autoriser toutes les autres requêtes en l'ajoutant dans l'en-tête Authorization sous la forme Bearer {token} .
Exemples
Exemples de requêtes
Création d'un utilisateur
Requête :
PUT /users/add
Content-Type: application/json

{
  "name": "John",
  "firstname": "Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
        
Réponse :
{
    "message": "Utilisateur créé avec succès",
    "user": {
        "_id": "603d214f1f292a0017b8dd92",
        "name": "John",
        "firstname": "Doe",
        "email": "johndoe@example.com"
    }
}
              
        
Modification d'utilisateur
Requête :
PATCH /users/603d214f1f292a0017b8dd92
Authorization: Bearer {token}
Content-Type: application/json
            
{
    "name": "John Updated"
}            
        
Réponse :
{
    "message": "Utilisateur modifié",
    "user": {
        "_id": "603d214f1f292a0017b8dd92",
        "name": "John Updated",
        "firstname": "Doe",
        "email": "johndoe@example.com"
    }
}              
        
Création de catway
Requête :
POST /catways
Authorization: Bearer {token}
Content-Type: application/json
            
{
    "catwayNumber": 1,
    "type": "long"
}     
        
Réponse :
{
    "message": "Catway créé avec succès",
    "catway": {
        "_id": "603d21741f292a0017b8dd93",
        "catwayNumber": 1,
        "type": "long",
        "catwayState": "Disponible"
    }
}
        
Exemples de réponse en cas d'erreur
En cas de problème, comme des informations manquantes ou des autorisations incorrectes, l'API renvoie une erreur.

Erreur d'autorisation (401 Unauthorized)
Requête :
GET /catways

Réponse :
{
    "error": "Token invalide ou manquant"
}
              
        
Erreur de Validation (400 Bad Request)
Si une requête comporte des champs manquants ou mal formatés, l'API renvoie une erreur de validation.

Requête :
POST /users/add
Content-Type: application/json
            
{
    "name": "John",
    "firstname": ""
} 
        
Réponse :
{
    "error": "Le champ 'firstname' est requis"
}  
        
Glossaire
API (Application Programming Interface) : Interface qui permet aux applications de communiquer entre elles.
Catway : Terme désignant un ponton ou une passerelle dans un port de plaisance, permettant l’amarrage des bateaux.
Token JWT (JSON Web Token) : Jeton sécurisé utilisé pour l'authentification et la transmission d'informations de manière sécurisée.
CRUD : Acronyme pour Create, Read, Update, Delete, soit les quatre opérations de base pour la gestion des données.
Middleware : Fonction qui intercepte et traite les requêtes avant qu'elles n'atteignent leur destination (par exemple, pour vérifier les autorisations).
Endpoint : URL spécifique où une ressource de l’API peut être accédée (par exemple, /users/add).