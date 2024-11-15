const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const auth = require('../middlewares/auth');

// Route pour créer une nouvelle réservation
router.post('/:catwayId', async (req, res) => {
    try {
        const newReservation = new Reservation({
            ...req.body,
            catwayNumber: req.params.catwayId
        });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour lister toutes les réservations
router.get('/', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer une réservation par son ID
router.get('/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour mettre à jour une réservation par son ID
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReservation) return res.status(404).json({ message: "Réservation non trouvée" });
        res.json(updatedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer une réservation par son ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) return res.status(404).json({ message: "Réservation non trouvée" });
        res.json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
