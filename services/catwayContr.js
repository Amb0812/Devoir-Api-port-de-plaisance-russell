const Catway = require('../schemas/Catway');

// Récupérer tous les catways
async function getAllCatways(req, res) {
    try{
        const allCatway = await Catway.find();
        res.json(allCatway);

        }catch (err) {
            res.status(500).json({message: 'Erreur serveur', error: err.message })
        }
    
}

// Récupérer le numéro précis d'un catway

async function getCatwayById(req, res) {
    try {
        const catwayId = await Catway.findOne({catwayNumber: req.params.id});
        if (!catwayId) {
        return res.status(404).json({message:'Catway non trouvé'});
        }
        
        res.json(catwayId);
    }   catch (err){
        res.status(500).json({message:'Erreur serveur', error: err.message});
    }
}

// Créer un nouveau Catway

async function createCatway(req, res) {
    try{
        const newCatway = await Catway.create(req.body);
        res.json(newCatway);
    }   catch (err) {
        res.status(400).json({message: 'Erreur lors de la création', error: err.message});
    }
}

//modifier un catway (sauf numéro et type)//

async function updateCatway(req, res) {
    try {
        const modifCatway = await Catway.findOneAndUpdate(
            {catwayNumber: req.params.id},
            {catwayState: req.body.catwayState},
            { returnDocument: 'after', runValidators: true }

        );
        if(!modifCatway) {
            return res.status(404).json({message: 'Catway non trouvé'});

        }
        res.json(modifCatway);
        }   catch (err) {
            res.status(400).json({message: 'Erreur lors de la modification', error: err.message});
        }
}

//Supprimer un catway//

async function deleteCatway(req, res) {
    try{
        const supCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id});
        if (!supCatway) {
        return res.status(404).json({message: 'Catway non trouvé'});
    }
    res.json(supCatway);
    } catch (err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message});
    }
}

module.exports = { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway}