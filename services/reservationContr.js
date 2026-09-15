const Reservation = require('../schemas/Reservation');

//Récupérer toutes les reservations d'un catway
async function getAllReservations(req, res) {
    try{
        const reservations = await Reservation.find({catwayNumber: req.params.id});
        res.json(reservations);
    } catch (err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message});
    }
}

//Récupérer une réservation d'un catway
async function getReservationbyId(req, res) {
    try{
        const uneReservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if(!uneReservation) {
            return res.status(404).json({message: 'Reservation non trouvée'});
            
        } 
        res.json(uneReservation);     
    } catch (err) {
        res.status(500).json({message:'Erreur serveur', error: err.message});
    }

}

// Récupérer toutes les réservations, tous catways 
async function getAllReservationsGlobal(req, res) {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

//Créer une réservation pour un catway
async function createReservation (req, res) {
    try {
        const newReservation = await Reservation.create({
            ...req.body,
            catwayNumber: req.params.id

        });
        res.json(newReservation);

    }   catch (err) {
        res.status(500).json({message:'Erreur serveur', error: err.message});
    }
}

//Modification d'une réservation
async function updateReservation (req, res) {
    try {
        const modReservation = await Reservation.findOneAndUpdate(
            { _id: req.params.idReservation, catwayNumber: req.params.id },
            req.body,
            {returnDocument: 'after', runValidators: true}
        );
        if (!modReservation) {
            return res.status(404).json({message: 'Reservation non trouvée'});
        }
        res.json(modReservation);
    }   catch (err){
        res.status(500).json({message: 'Erreur serveur', error: err.message});
    }
}

// Supprimer uen réservation 
async function deleteReservation (req, res) {
    try {
        const supReservation = await Reservation.findOneAndDelete({
            _id: req.params.idReservation, catwayNumber: req.params.id
        });
        if(!supReservation) {
            return res.status(404).json({message: 'Reservation non trouvée'});
        }
        res.json(supReservation);
    }catch (err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message});
    }
}

module.exports = { getAllReservations, getReservationbyId, getAllReservationsGlobal, createReservation, updateReservation, deleteReservation };