const _ = require('lodash');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const admin = require('../admin');
const helper = require('../helpers');
const collections = require('../enums/collections');
const notificationTypes = require('../enums/notifications');
const notification = require('../helpers/notification');

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservation_id}`)
.onCreate((snapshot, context) => {
    const reservation = snapshot.data();
    const firestore = admin.firestore();

    return firestore.collection(collections.property.main).doc(reservation.property_id).get()
        .then((property_snapshot) => {
            const promises = [];
            if(property_snapshot.exists){
                const property = property_snapshot.data();

                promises.push(
                    snapshot.ref.update({
                        id: snapshot.ref.id,
                        property: {
                            id: property.id,
                            name: property.name,
                            image: property.image || null,
                            address: property.full_address,
                        },
                        guests: [],
                        timestamp: {
                            created_at: helper.nowTimestamp(), 
                            updated_at: null,
                            deleted_at: null
                        }
                    })
                );

                promises.push(
                    property_snapshot.ref.update({
                        reservations:  firebase.firestore.FieldValue.arrayUnion({
                            id: snapshot.ref.id,
                            name: reservation.name,
                            checkin_date: reservation.checkin_date || null,
                            checkout_date: reservation.checkout_date || null,
                        })
                    })
                );

                promises.push(
                    notification.property(reservation.property_id, {
                        text: `New reservation created for ${reservation.name}`,
                        type: notificationTypes.reservationCreate,
                        payload: {
                            property_id: reservation.property_id,
                            reservation_id: snapshot.ref.id,
                        }
                    })
                )
            }
            return Promise.all(promises);
        });
});