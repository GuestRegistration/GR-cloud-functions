/**
 * Add a new guest to a reservation
 */

//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

 const addReservationGuest = async (parent, {id, name, gender, type}, context) => {
    clientAuthorizedMiddleware(context);

    const guest = {
        name, gender, type
    };

    const firestore = firebaseAdmin.firestore();

    const reservation = firestore.collection(collections.main).doc(id);
    await reservation.update({
        guests:  firebase.firestore.FieldValue.arrayUnion(guest)
    });

    return guest;
};

 module.exports = addReservationGuest;