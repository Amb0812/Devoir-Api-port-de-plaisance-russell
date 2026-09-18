const express = require('express');
const router = express.Router();
const catwayContr = require('../services/catwayContr');
const reservationContr = require('../services/reservationContr');
const authMiddlewares = require('../middlewares/auth');

//Routes des catways
router.get('/', authMiddlewares, catwayContr.getAllCatways);
router.get('/:id', authMiddlewares, catwayContr.getCatwayById);
router.post('/', authMiddlewares, catwayContr.createCatway);
router.put('/:id', authMiddlewares, catwayContr.updateCatway);
router.delete('/:id', authMiddlewares, catwayContr.deleteCatway);

// Routes des réservations
router.get('/:id/reservations', authMiddlewares, reservationContr.getAllReservations);
router.get('/:id/reservations/:idReservation', authMiddlewares, reservationContr.getReservationbyId);
router.post('/:id/reservations', authMiddlewares, reservationContr.createReservation);
router.put('/:id/reservations/:idReservation', authMiddlewares, reservationContr.updateReservation);
router.delete('/:id/reservations/:idReservation', authMiddlewares, reservationContr.deleteReservation);

module.exports = router;