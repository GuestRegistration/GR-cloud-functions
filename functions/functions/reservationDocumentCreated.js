const _ = require('lodash');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require('../enums/collections');
const notificationTypes = require('../enums/notifications');
const notification = require('../helpers/notification');

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservation}/${collections.reservation.meta.name}/{document}`)
.onCreate((snapshot, context) => {
    const document = context.params.document;
    const reservertionId = context.params.reservation;

    const firestore = admin.firestore();
    let reservation = null;
    // If it is a checkin document
    if(document === collections.reservation.meta.documents.checkin){
        const checkin = snapshot.data();
        return firestore.collection(collections.reservation.main).doc(reservertionId).get()
        .then(reservationSnapshot =>  {
            reservation = reservationSnapshot.data();
            return firestore.collection(collections.user.main).doc(reservation.user_id).get()
        })
        .then(user_snapshot => {            
            return Promise.all([
                 // update the users document with the reservation
                user_snapshot.ref.update({
                    reservations: firebase.firestore.FieldValue.arrayUnion({
                        id: reservation.id,
                        name: reservation.name,
                        property_id: reservation.property.id,
                        property_name: reservation.property.name,
                        property_address: reservation.property.address,
                        checkin_date: reservation.checkin_date || null,
                        checkout_date: reservation.checkout_date || null,
                    })
                }),
                // property notification
                notification.property(reservation.property_id, {
                    text: `${checkin.name.first_name} ${checkin.name.last_name} checked in to ${reservation.property.name}.`,
                    type: notificationTypes.reservationCheckin,
                    payload: {
                        property_id: reservation.property_id,
                        reservation_id: reservationSnapshot.ref.id
                    }
                }),
                // user notification
                notification.user(reservation.user_id, {
                    text: `You checked in to ${reservation.property.name}`,
                    type: notificationTypes.reservationCheckin,
                    payload: {
                        user_id: reservation.user_id,
                        property_id: reservation.property_id,
                        reservation_id: reservationSnapshot.ref.id,
                    }
                }),
            ]);
        })
    }

    return null;
});