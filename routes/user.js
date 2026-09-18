const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:email', async (req, res) => {
  try {
   const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    if (!email.includes('@')) {
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
router.delete('/:email', async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
