/**
 * update a reservation
 */
//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../../Property/Middlewares/propertySubscription')

const propertyCollections = require('../../Property/Enums/collections');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const sub = require('../../../App/Providers/pubsub');
const subscriptions = require('../Enums/subscriptions');

const updateReservation = async (parent, {id, data}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const reservationRef =  firestore.collection(collections.main).doc(id);
    const reservation = (await reservationRef.get()).data();
   
    // Get the property and use the middleware to check if the authenticated has permission
    const property = await firestore.collection(propertyCollections.main).doc(reservation.property_id).get();
    if(property.exists){
        userAuthorizedMiddleware(context, [property.data().user_id]);
        await propertySubscriptionMiddleware(reservation.property_id);

        await reservationRef.update(data);

        const updated_reservation = (await reservationRef.get()).data();
        
        //publish the new reservation to it subscriptions
        sub.publish(subscriptions.update, {ReservationUpdated: updated_reservation});
        return updated_reservation;
    }else{
        throw new Error('Property does not exist');
    }
   
};

module.exports = updateReservation;