const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require('../enums/collections');
const notificationTypes = require('../enums/notifications');
const notification = require('../helpers/notification');

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservationId}/${collections.reservation.subcollections.payments}/{paymentId}`)
.onWrite((change, context) => {

    // delete
    if(!change.after.exists) return Promise.resolve();

    const payment = change.after.data();
    const firestore = admin.firestore();
    const reservationId = context.params.reservationId;
    const userId = payment.metadata.user_id;
    const creditCard = payment.payment_method_details && payment.payment_method_details.card ? `ending with ${payment.payment_method_details.card.last4}` : null

    return firestore.collection(collections.reservation.main).doc(reservationId).get()
        .then(reservationSnapshot => {
            if(!reservationSnapshot.exists) return Promise.resolve();

            const reservation = reservationSnapshot.data();

            // Document update
            if(change.before.exists){
                const previously = change.before.data();
                // Charge got captured
                if (!previously.captured && payment.captured && userId) {
                    return notification.user(userId, {
                        text: `${reservation.property.name} charged you ${payment.currency.toUpperCase()} ${payment.amount_captured/100} from your card ${creditCard ? `(${creditCard})` : ''} authorization. {Desc: }`,
                        type: notificationTypes.chargeAuthorized,
                        payload: {
                            reservation_id: reservationId,
                            }
                        })
                }

                // Charge got refunded

                if (previously.captured && payment.amount_refunded > 0 && userId) {
                    const currentRefund = payment.amount_refunded - previously.amount_refunded;
                    if(currentRefund > 0) {
                        return notification.user(userId, {
                            text: `${reservation.property.name} refunded you ${payment.currency.toUpperCase()} ${currentRefund/100} to your card ${creditCard ? `(${creditCard})` : ''}`,
                            type: notificationTypes.chargeRefunded,
                            payload: {
                                reservation_id: reservationId,
                                }
                        })
                    }
                }
            }
            
            // Document write
            else{
                if(userId) {
                    if(!payment.captured){
                        return notification.user(userId, {
                            text: `You have authorized the charge of ${payment.currency.toUpperCase()} ${payment.amount/100} on your card ${creditCard ? `(${creditCard})` : ''} for your reservation at ${reservation.property.name}`,
                            type: notificationTypes.chargeAuthorized,
                            payload: {
                                reservation_id: reservationId,
                                }
                            })
                    }

                    if(!payment.metadata.charge_id) {  // No charge ID, must be an extra charge
                        return notification.user(userId, {
                            text: `${reservation.property.name} charged your card ${creditCard ? `(${creditCard})` : ''} ${payment.currency.toUpperCase()} ${payment.amount_captured/100} for your reservation. ${payment.desription ? `Reason: ${payment.description}` : ''}`,
                            type: notificationTypes.cardCharged,
                            payload: {
                                reservation_id: reservationId,
                                }
                            })
                    }
                }
            }
            return Promise.resolve();
        })
        .then(() => {
            if(!userId) return Promise.resolve()
            const userRef = firestore.collection(collections.user.main).doc(userId);
            return userRef.get()
        })
        .then((userSnapshot) => {
            // update user payments
            if(userSnapshot && userSnapshot.exists){
                return userSnapshot.ref.collection(collections.user.subcollections.payments).doc(payment.id).set(payment)
            } 
            return Promise.resolve();
        })
});