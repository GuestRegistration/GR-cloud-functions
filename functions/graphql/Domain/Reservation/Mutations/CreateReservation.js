/**
 * create new reservation
 */

//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertyCollections = require('../../Property/Enums/collections');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const sub = require('../../../App/Providers/pubsub');
const subscriptions = require('../Enums/subscriptions');

 const createReservation = async (parent, {property_id, name, booking_channel, checkin_date, checkout_date, instruction, charges}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const property = await firestore.collection(propertyCollections.main).doc(property_id).get();

    if(property.exists){
        userAuthorizedMiddleware(context, [property.data().user_id]);
        
        let reservation = {
            property_id,
            name, 
            checkin_date, 
            checkout_date,
            instruction: instruction || null,
            booking_channel: booking_channel || null , 
            charges
        };
        const result = await firestore.collection(collections.main).add(reservation);
        
        reservation = {
            id: result.id,
            ...(await result.get()).data()
        }
        //publish the new reservation to it subscriptions
        sub.publish(subscriptions.create, {ReservationCreated: reservation});
    
        return reservation;
    }else{
        throw new Error('Property does not exist');
    }
    
};

 module.exports = createReservation;