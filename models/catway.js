const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true, unique: true },
    type: { type: String, enum: ['long', 'short'], required: true },
    catwayState: { type: String, default: 'Disponible' } // Par exemple "Disponible" ou "Occupé"
});

module.exports = mongoose.model('Catway', catwaySchema);
