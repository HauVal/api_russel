const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');
const auth = require('../middlewares/auth');

// Route pour créer un nouveau catway
router.post('/', async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer tous les catways
router.get('/', auth, async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer un catway par son ID
router.get('/:id', auth, async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour mettre à jour un catway par son ID
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCatway) return res.status(404).json({ message: "Catway non trouvé" });
        res.json(updatedCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un catway par son ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
        if (!deletedCatway) return res.status(404).json({ message: "Catway non trouvé" });
        res.json({ message: "Catway supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
