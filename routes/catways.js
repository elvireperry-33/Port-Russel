const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');
/**
 * Récupère la liste de tous les catways.
 * @route GET /catways
 * @returns {Array} Liste des catways
 */
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * Récupère un catway grâce à son numéro.
 * @route GET /catways/:id
 * @param {number} id Numéro du catway
 * @returns {Object} Catway trouvé
 */
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * Crée un nouveau catway.
 * @route POST /catways
 * @returns {Object} Catway créé
 */
router.post('/', async (req, res) => {
  try {
    const catway = new Catway(req.body);
    const nouveauCatway = await catway.save();

    res.status(201).json(nouveauCatway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * Modifie l'état d'un catway.
 * @route PUT /catways/:id
 * @param {number} id Numéro du catway
 * @returns {Object} Catway modifié
 */
router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: Number(req.params.id) },
      { catwayState: req.body.catwayState },
      { new: true, runValidators: true }
    );

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * Supprime un catway.
 * @route DELETE /catways/:id
 * @param {number} id Numéro du catway
 * @returns {Object} Confirmation de suppression
 */
router.delete('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.status(200).json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

