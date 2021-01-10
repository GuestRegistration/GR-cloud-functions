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

    const propertyRef = firestore.collection(`${collections.property.main}`).doc(`${reservation.property_id}`);
    return propertyRef.get()
            .then((property_snapshot) => Promise.resolve(property_snapshot.data()))
            .then((property) => {
                // update the reservation with the property information
                if(property){
                    return Promise.all([
                        snapshot.ref.update({
                            id: snapshot.ref.id,
                            property: {
                                id: property.id,
                                name: property.name,
                                image: property.image || null,
                                city: property.address.city,
                                country: property.address.country
                            },
                            guests: [],
                            timestamp: {
                                created_at: helper.nowTimestamp(), 
                                updated_at: null,
                                deleted_at: null
                            }
                         }),
                         propertyRef.update({
                             reservations:  firebase.firestore.FieldValue.arrayUnion({
                                 id: snapshot.ref.id,
                                 name: reservation.name,
                                 checkin_date: reservation.checkin_date || null,
                                 checkout_date: reservation.checkout_date || null,
                             })
                         }),
                         notification.property(reservation.property_id, {
                            text: `New reservation created for ${reservation.name}`,
                            type: notificationTypes.reservationCreate,
                            payload: {
                                property_id: reservation.property_id,
                                reservation_id: snapshot.ref.id,
                            }
                        })
                     ]);
                }
                return null;
            });
});