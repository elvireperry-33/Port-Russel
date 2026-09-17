const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
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
router.post('/', async (req, res) => {
  try {
    const catway = new Catway(req.body);
    const nouveauCatway = await catway.save();

    res.status(201).json(nouveauCatway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
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
