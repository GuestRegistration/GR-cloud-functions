const functions = require('firebase-functions');
const collections = require('../enums/collections');
const events = require('../rest/stripe/events');
const admin = require('../admin');

module.exports = functions.firestore.document(`/${collections.system.stripe_payment_events}/{event_id}`)
.onCreate((snapshot, context) => {
    const event = snapshot.data();
    const firestore = admin.firestore();
    const promises = [];

    const metadata = event.data.object.metadata;
    const userId =  metadata.user_id;
    const propertyId =  metadata.property_id;
    const reservationId =  metadata.reservation_id;
    const chargeId =  metadata.charge_id;

    const propertyRef = firestore.collection(collections.property.main).doc(propertyId);

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
                if(events.connect.payment_intent.includes(event.type) || events.connect.charge.includes(event.type)){
                    const intent = event.data.object; 
                    return userRef.collection(collections.user.subcollections.stripe_payment_events)
                            .doc(intent.id).set(intent);
                }
                return Promise.resolve()
            })
            .then(() => {
                // Record successful charge for user
                if(event.type === 'charge.succeeded'){
                    return userRef.collection(collections.user.subcollections.payments).doc(event.data.object.id).set(event.data.object)
                }
                return Promise.resolve()
            })
    }

    const updateReservationPayment = () => {
        if(!reservationId) return Promise.resolve();
        const reservationRef = firestore.collection(collections.reservation.main).doc(reservationId);

        return reservationRef.get()
            .then(snapshot => {
                if(snapshot.exists){
                    // Record successful charge for reservation
                    if(event.type === 'charge.succeeded'){
                        return reservationRef.collection(collections.reservation.subcollections.payments).doc(event.data.object.id).set(event.data.object)
                    }
                }
                return Promise.resolve()
            })
    }

    return Promise.all(updateUserPayment(), updateReservationPayment())
 });

