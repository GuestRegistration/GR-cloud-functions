const functions = require('firebase-functions');
const collections = require('../enums/collections');
const events = require('../rest/stripe/events');
const admin = require('../admin');

module.exports = functions.firestore.document(`/${collections.system.stripe_payment_events}/{event_id}`)
.onCreate((snapshot, context) => {
    const event = snapshot.data();

    if(!events.charge.includes(event.type)) return null;

    const firestore = admin.firestore();
    const charge = event.data.object; 
    const metadata = charge.metadata;
    const userId =  metadata.user_id;
    const reservationId =  metadata.reservation_id;
    // const chargeId =  metadata.charge_id;
    // const propertyId =  metadata.property_id;
    // const propertyRef = firestore.collection(collections.property.main).doc(propertyId);

    const updateUserPayment = () => {
        if(!userId) return Promise.resolve()
            const userRef = firestore.collection(collections.user.main).doc(userId);
    
            return userRef.get()
            .then(snapshot => {
                if(snapshot.exists){
                    // General logging of event for user
                    return userRef.collection(collections.user.subcollections.stripe_payment_events).doc(event.id).set(event)
                }
                return Promise.resolve()
            })
            .then(() => {
                // Add to user payments
                return userRef.collection(collections.user.subcollections.payments).doc(charge.id).set(charge)
            })
    }

    const updateReservationPayment = () => {
        if(!reservationId) return Promise.resolve();
        const reservationRef = firestore.collection(collections.reservation.main).doc(reservationId);

        return reservationRef.get()
            .then(snapshot => {
                if(snapshot.exists){
                    // Record payment for reservation
                    return reservationRef.collection(collections.reservation.subcollections.payments).doc(charge.id).set(charge)
                }
                return Promise.resolve()
            })
    }

    return Promise.all([updateUserPayment(), updateReservationPayment()])
 });

