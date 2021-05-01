const functions = require('firebase-functions');
const collections = require('../enums/collections');
const events = require('../rest/stripe/events');
const admin = require('../admin');

module.exports = functions.firestore.document(`/${collections.system.stripe_payment_events}/{event_id}`)
.onCreate((snapshot, context) => {
    const event = snapshot.data();

    const firestore = admin.firestore();

    if(events.charge.includes(event.type) && event.data.object.object === 'charge'){
        const charge = event.data.object; 
        const metadata = charge.metadata;
        const userId =  metadata.user_id;
        const reservationId =  metadata.reservation_id;
        // const chargeId =  metadata.charge_id;
        // const propertyId =  metadata.property_id;
    
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
    }

    if(events.customer.includes(event.type) && event.data.object.object === 'customer') {
        const customer = event.data.object; 
        const metadata = customer.metadata;
        const userId =  metadata.user_id;
        const propertyId =  metadata.property_id;


        // update user collection
        const updateUserPropertyCustomers = () => {

            if(!userId || !propertyId) return Promise.resolve();
        
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
                    if(event.type === 'customer.deleted'){
                        return userRef.collection(collections.user.subcollections.stripe_property_customers).doc(propertyId).delete();
                    }
                    return userRef.collection(collections.user.subcollections.stripe_property_customers).doc(propertyId).set(customer)
                })

        }

        // update property collection
        const updatePropertyCustomers = () => {
            
            if(!userId || !propertyId) return Promise.resolve();

            const propertyRef = firestore.collection(collections.property.main).doc(propertyId);

            return propertyRef.get()
            .then(snapshot => {
                if(snapshot.exists){
                    if(event.type === 'customer.deleted'){
                        return propertyRef.collection(collections.property.subcollections.stripe_customers).doc(userId).delete();
                    }
                    return propertyRef.collection(collections.property.subcollections.stripe_customers).doc(userId).set(customer)
                }
                return Promise.resolve()
            })
        }

        return Promise.all([updateUserPropertyCustomers(), updatePropertyCustomers()])

    }

    return null
 });

