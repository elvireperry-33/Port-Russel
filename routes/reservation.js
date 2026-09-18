const express = require('express');
const router = express.Router({ mergeParams: true });
const Reservation = require('../models/reservation');
router.get('/', async (req, res) => {
  try {
    const reservations = req.params.id
      ? await Reservation.find({ catwayNumber: Number(req.params.id) })
      : await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation({
  ...req.body,
  catwayNumber: req.params.id
    ? Number(req.params.id)
    : req.body.catwayNumber
});

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      req.body,
      { new: true }
    );
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:idReservation', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.idReservation);
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 router.get('/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id)
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'Réservation introuvable'
      });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
