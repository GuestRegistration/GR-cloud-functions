const _ = require('lodash');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const admin = require('../admin');
const helper = require('../helpers');
const collections = require('../enums/collections');
const notificationTypes = require('../enums/notifications');
const notification = require('../helpers/notification');

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservationId}`)
.onUpdate((snapshot, context) => {
    const promises = [];
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    const reservationId = context.params.reservationId;

    const user_copy_before = helper.sortObject({
        id: reservationId,
        name: before.name,
        property_id: before.property.id,
        property_name: before.property.name,
        property_image: before.property.image,
        property_address: before.property.address,
        checkin_date: before.checkin_date || null,
        checkout_date: before.checkout_date || null,
    });
    const user_copy_after = helper.sortObject({
        id: reservationId,
        name: after.name,
        property_id: after.property.id,
        property_name: after.property.name,
        property_image: after.property.image,
        property_address: after.property.address,
        checkin_date: after.checkin_date || null,
        checkout_date: after.checkout_date || null,
    });
    
    const firestore = admin.firestore();

    if(after.user_id){

        // if there is difference in the data and there is user corresponding with the reservation

        if(!_.isEqual(user_copy_before, user_copy_after)){
            promises.push(
                firestore.collection(collections.user.main).doc(after.user_id).get()
                .then((user_snapshot) => {
                    if(user_snapshot.exists){
                        const user = user_snapshot.data();
                        const reservations = user.reservations.map(reservation => {
                            if(reservation.id === user_copy_before.id){
                                user_copy_after.role = reservation.role || null ;
                                return user_copy_after;
                            }
                            return reservation;
                        });
                        return user_snapshot.ref.update({reservations});
                    }
                    return Promise.resolve()
                })
            )
        }
    }
    //if the user id has been filled for the reservation for the first time. i.e at checking in
    else if(!before.user_id  && after.user_id){ 
        user_copy_after.role = 'primary';
        promises.push( 
           firestore.collection(collections.user.main).doc(after.user_id).update({
                reservations: firebase.firestore.FieldValue.arrayUnion(user_copy_after)
            })
        );
    }     

    const property_copy_before = helper.sortObject({
        id: reservationId,
        name: before.name,
        checkin_date: before.checkin_date || null,
        checkout_date: before.checkout_date || null,
    });
    const property_copy_after = helper.sortObject({
        id: reservationId,
        name: after.name,
        checkin_date: after.checkin_date || null,
        checkout_date: after.checkout_date || null,
    });

    // if there is difference in the data
    if(!_.isEqual(property_copy_before, property_copy_after)){
        promises.push(
            firestore.collection(collections.property.main).doc(before.property_id).get()
            .then((property_snapshot) => {
                // confirm if the property exist
                if(property_snapshot.exists){ 
                    const property = property_snapshot.data();
                    const reservations = property.reservations.map(reservation => {
                        if(reservation.id === property_copy_before.id){ 
                            return property_copy_after;
                        }
                        return reservation
                    });
                    return property_snapshot.ref.update({reservations})
                }
                return Promise.resolve()
            })
        )
    }

    // if just approved
    if(!before.approved_at && after.approved_at){
      promises.push(notification.user(after.user_id, {
        text: `Your reservation checkin to ${after.property.name} has been approved`,
        type: notificationTypes.reservationCheckinApproval,
        payload: {
            reservation_id: reservationId,
            property_id: after.property_id,
            }
        })); 
    }

    return Promise.all(promises)
});