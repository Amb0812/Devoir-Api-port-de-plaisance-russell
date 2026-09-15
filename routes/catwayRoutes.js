const express = require('express');
const router = express.Router();
const catwayContr = require('../services/catwayContr');
const reservationContr = require('../services/reservationContr');

//Routes des catways
router.get('/', catwayContr.getAllCatways);
router.get('/:id', catwayContr.getCatwayById);
router.post('/', catwayContr.createCatway);
router.put('/:id', catwayContr.updateCatway);
router.delete('/:id', catwayContr.deleteCatway);

// Routes des réservations
router.get('/:id/reservations', reservationContr.getAllReservations);
router.get('/:id/reservations/:idReservation', reservationContr.getReservationbyId);
router.post('/:id/reservations', reservationContr.createReservation);
router.put('/:id/reservations/:idReservation', reservationContr.updateReservation);
router.delete('/:id/reservations/:idReservation', reservationContr.deleteReservation);

module.exports = router;