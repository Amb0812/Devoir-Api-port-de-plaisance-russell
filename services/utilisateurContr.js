const User = require('../schemas/User');
const bcrypt = require('bcrypt');

//On récupère tous les utilisateurs//
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);

    }   catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message});

    }
}

// On récupère un utilisateur par son email//
async function getUserByEmail(req, res) {
    try{
        const user = await User.findOne({ email: req.params.email}); //Ici on cherche un utilisateur qui a exactement cette email//
       
        if (!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"});
        } 
        res.json(user);
    }   catch(err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message});

    }
}

//Créer un nouvel utilisateur//

async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);

        } catch (err) {
            res.status(400).json({message: 'Erreur lors de la création', error: err.message});

        }
    
}

//Modifier un utilisateur
async function updateUser(req, res) {
    try{
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const modUser = await User.findOneAndUpdate(
            { email: req.params.email },
            updateData,
            { returnDocument: 'after', runValidators: true }
        );
        if (!modUser) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});

        }
        res.json(modUser);
                
        } catch (err) {
            res.status(400).json({message: 'Erreur lors de la modification', error: err.message});

        }
            
}

//Supprimer un utilisateur//
 async function deleteUser(req, res) {
    try {
        const supUser = await User.findOneAndDelete({ email: req.params.email});
        if (!supUser) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});

        }
        res.json({message: 'Utilisateur supprimé avec succès'});

    } catch (err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message });
    }
}

module.exports = { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser };
