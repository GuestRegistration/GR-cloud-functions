const functions = require('firebase-functions');
const collections = require('../enums/collections');
const events = require('../rest/stripe/events');
const admin = require('../admin');
const notification = require('../helpers/notification');
const notificationTypes = require('../enums/notifications');

module.exports = functions.firestore.document(`/${collections.system.connected_stripe_payment_events}/{event_id}`)
.onCreate((snapshot, context) => {
    const event = snapshot.data();

    const firestore = admin.firestore();

    if(events.charge.includes(event.type) && event.data.object.object === 'charge'){
        const charge = event.data.object; 
        const metadata = charge.metadata;
        const userId =  metadata.user_id;
        const reservationId =  metadata.reservation_id;
        const chargeId =  metadata.charge_id;
        const propertyId =  metadata.property_id;

        let user = null; let reservation = null;

        const getUser = () => {
            if(!userId) return Promise.resolve(user)
            if(user !== null) return Promise.resolve(user);

            const userRef = firestore.collection(collections.user.main).doc(userId);
            user = {
                ref: userRef,
                data: null,
                exists: false,
            }
            return userRef.get().then(snapshot => {
                user.exists = snapshot.exists;
                if(snapshot.exists){
                    user.data = snapshot.data()
                } 
                return Promise.resolve(user)
            })
        }
        const getReservation = () => {
            if(!reservationId) return Promise.resolve(reservation)
            if(reservation !== null) return Promise.resolve(reservation);
            
            const reservationRef = firestore.collection(collections.reservation.main).doc(reservationId);
            reservation = {
                ref: reservationRef,
                data: null,
                exists: false,
            }
            return reservationRef.get().then(snapshot => {
                reservation.exists = snapshot.exists;
                if(snapshot.exists){
                    reservation.data = snapshot.data()
                } 
                return Promise.resolve(reservation)
            })
        }

        
        const updateUserPayment = () => {
            return getUser().then(user => {
                if(user && user.exists){
                    return user.ref.collection(collections.user.subcollections.stripe_payment_events).doc(event.id).set(event)
                }
                return Promise.resolve();
            })
        }
    
        const updateReservationPayment = () => {
            return getReservation().then(reservation => {
                if(reservation && reservation.exists){
                    return reservation.ref.collection(collections.reservation.subcollections.payments).doc(charge.id).set(charge)
                }
                return Promise.resolve();
            })
        }

        const extraChargeNotification = () => {
            return getReservation().then(reservation => {
                if(reservation && reservation.exists){
                    return notification.user(userId, {
                        text: `${reservation.data.property.name} charged your card ${charge.currency.toUpperCase()}${charge.amount_captured/100} for your reservation: "${charge.description}"`,
                        type: notificationTypes.cardCharged,
                        payload: {
                            reservation_id: reservationId,
                            property_id: propertyId,
                            }
                        })
                }
                return Promise.resolve();
            })
        }


        const refundNotification = () => {
            return getReservation().then(reservation => {
                if(reservation && reservation.exists){
                    return notification.user(userId, {
                        text: `${reservation.data.property.name} refunded you back with ${charge.currency.toUpperCase()}${charge.amount_refunded/100} for your reservation."`,
                        type: notificationTypes.chargeRefunded,
                        payload: {
                            reservation_id: reservationId,
                            property_id: propertyId,
                            }
                        })
                }
                return Promise.resolve();
            })
        }

        const promises = [updateUserPayment(), updateReservationPayment()];

        if(event.type === 'charge.succeeded' && !chargeId) promises.push(extraChargeNotification())

        if(event.type === 'charge.refunded') promises.push(refundNotification())

    
        return Promise.all(promises)
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

