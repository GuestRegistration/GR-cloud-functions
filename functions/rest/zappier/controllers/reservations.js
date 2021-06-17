const firebaseAdmin = require('../../../admin');
const collections = require('../../../enums/collections');

/**
 * Get property reservations
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getReservations = async (req, res) => {

    const firestore = firebaseAdmin.firestore();
    const property = req.property;

    const reservations = [];
    
    const QuerySnapshots = await firestore.collection(collections.reservation.main).where('property.id', '==', property.id).get();
    QuerySnapshots.forEach((snapshot) => {
        reservations.push({
            id: snapshot.ref.id,
            ...snapshot.data()
        });
    });

    return res.status(200).send(reservations);
};

module.exports = getReservations;