/**
 * Get a reservation data
 */
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 
 const getReservationPayments = async (parent, {id}, context) => {
    clientAuthorizedMiddleware(context);
 
    const firestore = firebaseAdmin.firestore();
    const payments = [];
    const query = await firestore.collection(collections.main).doc(id).collection(collections.subcollections.payments).get();
    if(!query.empty){
        query.forEach(snapshot => {
            payments.push(snapshot.data())
        })
    }

    return payments;
 
 };
 
 module.exports = getReservationPayments;