const express = require('express');
const router = express.Router();
const User = require('../models/user');
/**
 * Récupère la liste de tous les utilisateurs.
 * @route GET /users
 * @returns {Array} Liste des utilisateurs
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * Récupère un utilisateur grâce à son adresse e-mail.
 * @route GET /users/:email
 * @param {string} email Adresse e-mail de l'utilisateur
 * @returns {Object} Utilisateur trouvé
 */
router.get('/:email', async (req, res) => {
  try {
   const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * Crée un nouvel utilisateur.
 * @route POST /users
 * @param {string} username Nom de l'utilisateur
 * @param {string} email Adresse e-mail de l'utilisateur
 * @param {string} password Mot de passe de l'utilisateur
 * @returns {Object} Utilisateur créé

 */
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Adresse e-mail invalide' });
    } 
    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    } 
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * Modifie les informations d'un utilisateur.
 * @route PUT /users/:email
 * @param {string} email Adresse e-mail de l'utilisateur
 * @returns {Object} Utilisateur modifié

 */
router.put('/:email', async (req, res) => {
  try {
const user = await User.findOneAndUpdate(
    { email: req.params.email },
      req.body,
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * Supprime un utilisateur.
 * @route DELETE /users/:email
 * @param {string} email Adresse e-mail de l'utilisateur
 * @returns {Object} Confirmation de suppression

 */
router.delete('/:email', async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
