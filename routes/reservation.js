const express = require('express');
const router = express.Router({ mergeParams: true });
const Reservation = require('../models/reservation');
/**
 * Récupère la liste des réservations.
 * @route GET /reservations
 * @returns {Array} Liste des réservations
 */
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
/**
 * Récupère une réservation grâce à son identifiant.
 * @route GET /reservations/:id
 * @param {string} id Identifiant de la réservation
 * @returns {Object} Réservation trouvée
 */
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * Crée une nouvelle réservation.
 * @route POST /reservations
 * @returns {Object} Réservation créée
 */
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
/**
 * Modifie une réservation.
 * @route PUT /reservations/:idReservation
 * @param {string} idReservation Identifiant de la réservation
 * @returns {Object} Réservation modifiée
 */
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
/**
 * Supprime une réservation.
 * @route DELETE /reservations/:idReservation
 * @param {string} idReservation Identifiant de la réservation
 * @returns {Object} Confirmation de suppression
 */
router.delete('/:idReservation', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.idReservation);
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 /**
 * Récupère une réservation liée à un catway.
 * @route GET /catway/:id/reservations/:idReservation
 * @param {number} id Numéro du catway
 * @param {string} idReservation Identifiant de la réservation
 * @returns {Object} Réservation trouvée
 */
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
