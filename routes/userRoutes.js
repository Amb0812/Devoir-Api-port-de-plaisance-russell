const express = require('express');
const router = express.Router();
const utilisateurContr = require('../services/utilisateurContr');

//on va aller récupérer tous les utilisateurs 
router.get('/', utilisateurContr.getAllUsers);

//On va récupérer un utilisateur par son email
router.get('/:email', utilisateurContr.getUserByEmail);

// on va créer un utilisateur
router.post('/', utilisateurContr.createUser);

// On va modifier un utilisateur
router.put('/:email', utilisateurContr.updateUser);

//On va supprimer un utilisateur
router.delete('/:email', utilisateurContr.deleteUser);

module.exports = router;