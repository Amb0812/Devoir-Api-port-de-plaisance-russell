const express = require('express');
const router = express.Router();
const utilisateurContr = require('../services/utilisateurContr');
const authMiddlewares = require('../middlewares/auth');

//on va aller récupérer tous les utilisateurs 
router.get('/', authMiddlewares, utilisateurContr.getAllUsers);

//On va récupérer un utilisateur par son email
router.get('/:email', authMiddlewares, utilisateurContr.getUserByEmail);

// on va créer un utilisateur
router.post('/', authMiddlewares, utilisateurContr.createUser);

// On va modifier un utilisateur
router.put('/:email', authMiddlewares, utilisateurContr.updateUser);

//On va supprimer un utilisateur
router.delete('/:email', authMiddlewares, utilisateurContr.deleteUser);

module.exports = router;