const express = require('express');
const router = express.Router();
const service = require('../services/users');
const auth = require('../middlewares/auth');
const User = require('../models/user');

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

// Protège les routes avec le middleware auth
router.get('/:id', auth, service.getById);
router.patch('/:id', auth, service.update);
router.delete('/:id', auth, service.delete);

// Route pour la connexion
router.post('/login', service.login);


module.exports = router;
