/**
 * Approve a checked in reservation
 */
//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')

const collections = require('../../../../enums/collections')
const helper = require('./../../../../helper')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()

const updateReservation = async (parent, {id}, context) => {
    client_middleware(context)

    const reservationRef =  firestore.collection(collections.reservation.main).doc(id)
    const reservation = await reservationRef.get()
   
    // Get the property and use the middleware to check if the authenticated has permission
    if(reservation.exists && reservation.data().property.id){
        const property_id = reservation.data().property.id
        const property = await firestore.collection(collections.property.main).doc(property_id).get()
        if(property.exists){
            user_middleware(context, property.data().user_id)
            
            const checkinDocRef = reservationRef.collection(collections.reservation.meta.name)
                                    .doc(collections.reservation.meta.documents.checkin)
            const checkinDoc = await checkinDocRef.get()

            if(reservation.checkedin_at !== null && checkinDoc.exists){
                // update the checkin document
                await checkinDocRef.update({
                    approved_at: helper.nowTimestamp()
                })
                // update the document itself too
                await reservationRef.update({
                    approved_at: helper.nowTimestamp()
                });
            }else{
                throw new Error('Can\'t approve reservation. The reservation is not checked in yet')
            }

            return (await reservationRef.get()).data();
        }else{
            throw new Error('Property does not exist')
        }
    }else{
        throw new Error('No valid property associated')
    }
    
}

module.exports = updateReservation