const firebaseAdmin = require('../../../admin');
const collections = require('../../../enums/collections');
const { nowTimestamp } = require('../../../helpers')

const firestore = firebaseAdmin.firestore();

/**
 * poll property reservations
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const pollReservations = async (req, res) => {
    const { poll } = req.query;
    const property = req.property;
    const integrations = req.integrations;
    const propertyRef = firestore.collection(collections.property.main).doc(property.id);
    
    const updateLastPoll = async () => {
        await propertyRef.collection(collections.property.meta.name)
        .doc(collections.property.meta.documents.integrations).update({
            zapier_last_poll: nowTimestamp()
        }); 
    }

    // if Zapier never polled
    if(!integrations.zapier_last_poll) {

        await updateLastPoll();

        return res.status(200).send([]);
    }

    const reservations = [];

    try {
        const QuerySnapshots = await firestore.collection(collections.reservation.main)
        .where('property.id', '==', property.id)
        .where(poll ? poll : 'timestamp.created_at', '>', integrations.zapier_last_poll)
        .get();
        
        QuerySnapshots.forEach((snapshot) => {
            reservations.push({
                id: snapshot.ref.id,
                ...snapshot.data()
            });
        });

        await updateLastPoll();

        return res.status(200).send(reservations);
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
    
};



module.exports = pollReservations;