/**
 * Get list of reservations
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getReservations = async (parent, args, context) => {
    clientAuthorizedMiddleware(context);
    const reservations = [];

    const firestore = firebaseAdmin.firestore();

    const QuerySnapshots = await firestore.collection(collections.main).get();
    
    QuerySnapshots.forEach((snapshot) => {
        reservations.push({
            id: snapshot.ref.id,
            ...snapshot.data()
        });
    });
    return reservations;
};

module.exports = getReservations;