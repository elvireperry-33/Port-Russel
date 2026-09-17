const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        if (user.password !== password) {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        return res.status(200).json({ message: 'Connexion réussie', user });
      } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
      }
  });
  router.get('/logout', (req, res) => {
    return res.status(200).json({ message: 'Déconnexion réussie' });
    });
module.exports = router;