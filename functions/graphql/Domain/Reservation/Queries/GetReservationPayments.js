/**
 * Get a reservation data
 */
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const propertySubscriptionMiddleware = require('../../Property/Middlewares/propertySubscription')

 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 
 const getReservationPayments = async (parent, {id}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const reservationDoc = await firestore.collection(collections.main).doc(id).get();

    if(reservationDoc.exists){
        const reservation = reservationDoc.data();
        await propertySubscriptionMiddleware(reservation.property_id);

        const payments = [];
        const query = await firestore.collection(collections.main).doc(id).collection(collections.subcollections.payments).get();
        if(!query.empty){
            query.forEach(snapshot => {
                payments.push(snapshot.data())
            })
        }
        return payments;

    }else{
        throw new Error("The reservation does not exist");
    }
 };
 
 module.exports = getReservationPayments;