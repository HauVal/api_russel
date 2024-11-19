const express = require('express');
const router = express.Router();
const service = require('../services/users');
const auth = require('../middlewares/auth');
const User = require('../models/user');

/**
 * @swagger
 * @route PUT /users/add
 * @group Users - Opérations liées aux utilisateurs
 * @summary Crée un nouvel utilisateur.
 * @param {string} name.body.required - Nom de l'utilisateur
 * @param {string} firstname.body.required - Prénom de l'utilisateur
 * @param {string} email.body.required - Email de l'utilisateur
 * @param {string} password.body.required - Mot de passe de l'utilisateur
 * @returns {object} 201 - L'utilisateur créé avec succès
 * @returns {Error} 400 - Les informations fournies sont invalides
 * @returns {Error} 500 - Erreur interne du serveur
 */

// Route pour afficher la liste des utilisateurs
router.get('/', auth, async (req, res) => {
  try {
      const users = await User.find(); // Récupère tous les utilisateurs
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.put('/add', service.add);
/**
 * @swagger
 * @route PATCH /users/:id
 * @group Users - Opérations liées aux utilisateurs
 * @summary Modifie les informations d'un utilisateur.
 * @param {string} id.path.required - ID de l'utilisateur
 * @param {string} name.body - Nom de l'utilisateur
 * @param {string} firstname.body - Prénom de l'utilisateur
 * @param {string} email.body - Email de l'utilisateur
 * @returns {object} 201 - L'utilisateur modifié avec succès
 * @returns {Error} 404 - Utilisateur non trouvé
 * @returns {Error} 500 - Erreur interne du serveur
 */

// Protège les routes avec le middleware auth
router.get('/:id', auth, service.getById);

router.patch('/:id', auth, service.update);
/**
 * @swagger
 * @route DELETE /users/:id
 * @group Users - Opérations liées aux utilisateurs
 * @summary Supprime un utilisateur.
 * @param {string} id.path.required - ID de l'utilisateur
 * @returns {object} 204 - Utilisateur supprimé avec succès
 * @returns {Error} 404 - Utilisateur non trouvé
 * @returns {Error} 500 - Erreur interne du serveur
 */

router.delete('/:id', auth, service.delete);

// Route pour la connexion
router.post('/login', service.login);


module.exports = router;
