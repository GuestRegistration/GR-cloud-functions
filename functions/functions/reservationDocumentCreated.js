const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const collections = require('../enums/collections')
const notificationTypes = require('../enums/notifications')
const notification = require('../helper/notification')

const firestore = admin.firestore()

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservation}/${collections.reservation.meta.name}/{document}`)
.onCreate((snapshot, context) => {
    const document = context.params.document;
    const reservertionId = context.params.reservation;
    // If it is a checkin document
    if(document === collections.reservation.meta.documents.checkin){
        const checkin = snapshot.data()
        return firestore.collection(collections.reservation.main).doc(reservertionId).get()
            .then(reservationSnapshot => {
                const reservation = reservationSnapshot.data();
               
                return Promise.all([
                    notification.property(reservation.property_id, {
                        text: `${checkin.name.first_name} ${checkin.name.last_name} checked in.`,
                        type: notificationTypes.reservationCheckin,
                        payload: {
                            property_id: reservation.property_id,
                            reservation_id: reservationSnapshot.ref.id
                        }
                    }),
                    notification.user(reservation.user_id, {
                        text: `You checked in to ${reservation.property.name}`,
                        type: notificationTypes.reservationCheckin,
                        payload: {
                            user_id: reservation.user_id,
                            property_id: reservation.property_id,
                            reservation_id: reservationSnapshot.ref.id,
                        }
                    }),
                ]) 
            })
            
    }

    return null;
})