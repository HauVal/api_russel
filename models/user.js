/**
 * @typedef User
 * @property {string} name.required - Nom de l'utilisateur
 * @property {string} firstname - Prénom de l'utilisateur
 * @property {string} email.required - Email de l'utilisateur
 * @property {string} password.required - Mot de passe de l'utilisateur
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },
    firstname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'L’email est requis'],
        unique: true, // index unique
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    }
}, {
    // ajoute 2 champs au document createdAt et updatedAt
    timestamps: true
});

// Hash le mot de passe quand il est modifié
User.pre('save',async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

module.exports = mongoose.model('User', User);