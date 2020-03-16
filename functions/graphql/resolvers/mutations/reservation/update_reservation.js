/**
 * update a reservation
 */
//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()

const updateReservation = async (parent, {id, name, booking_channel, booking_no, checkin_date, checkout_date}, context) => {
    client_middleware(context)

    const reservationRef =  firestore.collection(collections.reservation.main).doc(id)
    const reservation = await reservationRef.get()
   
    // Get the property and use the middleware to check if the authenticated has permission
    if(reservation.property.id){
        const property = await firestore.collection(collections.property.main).doc(id).get()
        if(property.exists){
            user_middleware(context, [property.data().user_id])
            const updated_reservation = {
                id, name, booking_channel, booking_no
            }
            if(checkin_date){
                updated_reservation.checkin_date = checkin_date
            }
            if(checkout_date){
                updated_reservation.checkout_date = checkout_date
            }
            const result = await reservationRef.update(updated_reservation);
            //publish the new reservation to it subscriptions
            // sub.pubsub.publish(sub.subscriptions.reservation.update, {ReservationUpdated: reservation})
             return (await reservationRef.get()).data();
        }else{
            throw new Error('Property does not exist')
        }
    }else{
        throw new Error('No valid property associated')
    }
    
}

module.exports = updateReservation