/**
 * Approve a checked in reservation
 */
//  middlewares

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../../Property/Middlewares/propertySubscription')
const propertyCollections = require('../../Property/Enums/collections');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const helper = require('../../../../helpers');

const approveReservation = async (parent, {id}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const reservationRef =  firestore.collection(collections.main).doc(id);
    const reservation = await reservationRef.get();
   
    // Get the property and use the middleware to check if the authenticated has permission
    if(reservation.exists && reservation.data().property.id){
        const property_id = reservation.data().property.id;

        const property = await firestore.collection(propertyCollections.main).doc(property_id).get();
        if(property.exists){
            userAuthorizedMiddleware(context, [property.data().user_id]);

            await propertySubscriptionMiddleware(property_id);
            
            const checkinDocRef = reservationRef.collection(collections.meta.name)
                                    .doc(collections.meta.documents.checkin);

            const checkinDoc = await checkinDocRef.get();

            if(reservation.data().checkedin_at && checkinDoc.exists){
                // update the checkin document
                await checkinDocRef.update({
                    approved_at: helper.nowTimestamp()
                });
                // update the document itself too
                await reservationRef.update({
                    approved_at: helper.nowTimestamp()
                });
            }else{
                throw new Error('The reservation is not checked in yet');
            }
            return (await reservationRef.get()).data();
        }else{
            throw new Error('Property does not exist');
        }
    }else{
        throw new Error('No valid property associated');
    }
    
};

module.exports = approveReservation;