//Ici dans ce fichier, on va créer les routes d'authentification//

const express = require('express');
const router = express.Router(); // Permet de bien rangés mes routes dans des fichiers séparés, plutôt que de tous les mettre dans app.js//
const authControllers = require('../services/authControllers');

//quand quelqu'un envoie une requête POST vers /login, exécute la fonction login de mon contrôleur.
router.post('/login', authControllers.login);
//quand quelqu'un envoie une requête GET vers /logout, exécute la fonction logout de mon contrôleur. 
router.get('/logout', authControllers.logout);

module.exports = router;
