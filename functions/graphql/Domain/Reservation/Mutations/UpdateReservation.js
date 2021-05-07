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

const updateReservation = async (parent, {id, name, checkin_date, checkout_date, instruction, charges, agreements, questions}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const reservationRef =  firestore.collection(collections.main).doc(id);
    const reservation = (await reservationRef.get()).data();
   
    // Get the property and use the middleware to check if the authenticated has permission
    if(reservation.property.id){
        const property = await firestore.collection(propertyCollections.main).doc(reservation.property.id).get();
        if(property.exists){
            userAuthorizedMiddleware(context, [property.data().user_id]);
            await propertySubscriptionMiddleware(reservation.property_id);

            let updated_reservation = {
                id, 
                name, 
                instruction: instruction || null,
                charges,
                agreements,
                questions
            };

            if(checkin_date){
                updated_reservation.checkin_date = checkin_date;
            }
            if(checkout_date){
                updated_reservation.checkout_date = checkout_date;
            }
            const result = await reservationRef.update(updated_reservation);

            updated_reservation = (await reservationRef.get()).data();
            
            //publish the new reservation to it subscriptions
            sub.publish(subscriptions.update, {ReservationUpdated: updated_reservation});
            return updated_reservation;
        }else{
            throw new Error('Property does not exist');
        }
    }else{
        throw new Error('No valid property associated');
    }
    
};

module.exports = updateReservation;