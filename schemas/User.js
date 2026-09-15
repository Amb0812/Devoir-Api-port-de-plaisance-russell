const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

});


//Authentification//
// Avant chaque sauvegarde utilisateur//
userSchema.pre('save', async function () {
    //Si aucune modification de mot de passe, on ne fait rien//
    if(!this.isModified('password')) return ;

    //Si le mot de passe a été modifié, on va cacher/chiffrer le mot de passe avec bcrypt
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User',userSchema)