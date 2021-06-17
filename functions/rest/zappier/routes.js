const express = require('express');
const ping = require('./controllers/ping');
const accessToken = require('./controllers/accessToken');
const reservations = require('./controllers/reservations');
const charges = require('./controllers/charges');
const agreements = require('./controllers/agreements');
const instructions = require('./controllers/instructions');
const questions = require('./controllers/questions');
const reservationFields = require('./controllers/reservation-fields');
const createReservation = require('./controllers/create-reservation');
const pollReservations = require('./controllers/poll-reservations');
const { verifyAccessToken, verifyClient, verifyOauthCode } = require('./middlewares');

const router = express.Router();

router.post('/ping', verifyAccessToken, ping);
router.post('/oauth/access_token', verifyClient, verifyOauthCode, accessToken);
router.get('/reservations', verifyAccessToken, reservations);
router.get('/charges', verifyAccessToken, charges );
router.get('/instructions', verifyAccessToken, instructions);
router.get('/agreements', verifyAccessToken, agreements );
router.get('/questions', verifyAccessToken, questions );
router.get('/reservation-fields', verifyAccessToken, reservationFields);
router.get('/poll-reservations', verifyAccessToken, pollReservations);
router.post('/create-reservation', verifyAccessToken, createReservation);

module.exports = router;