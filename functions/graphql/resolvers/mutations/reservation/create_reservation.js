/**
 * create new reservation
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()


 const createReservation = async (parent, {property_id, name, booking_channel, checkin_date, checkout_date}, context) => {
    client_middleware(context)
    const property = await firestore.collection(collections.property.main).doc(property_id).get()

    if(property.exists){
        user_middleware(context, [property.data().user_id])
        
        const reservation = {
            property_id,
            name, 
            booking_channel, 
            checkin_date, 
            checkout_date 
        }
        const result = await firestore.collection(collections.reservation.main).add(reservation)
        reservation.id = result.id
        reservation.checkin_url = `https://testapp.guestregistration.com/r/${reservation.id}`
    
        //publish the new reservation to it subscriptions
        // sub.pubsub.publish(sub.subscriptions.reservation.create, {ReservationCreated:reservation})
    
        return reservation;
    }else{
        throw new Error('Property does not exist')
    }
    
}

 module.exports = createReservation