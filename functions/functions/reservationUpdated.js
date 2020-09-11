const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const helper = require('../helper')
const collections = require('../enums/collections')
const notificationTypes = require('../enums/notifications')
const notification = require('../helper/notification')

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservation_id}`)
.onUpdate((snapshot, context) => {
    const promises = []
    const before = snapshot.before.data()
    const after = snapshot.after.data()

    const user_copy_before = helper.sortObject({
        id: before.id,
        property_id: before.property.id,
        property_name: before.property.name,
        property_city: before.property.city,
        property_country: before.property.country,
        checkin_date: before.checkin_date || null,
        checkout_date: before.checkout_date || null,
    })
    const user_copy_after = helper.sortObject({
        id: after.id,
        property_id: after.property.id,
        property_name: after.property.name,
        property_city: after.property.city,
        property_country: after.property.country,
        checkin_date: after.checkin_date || null,
        checkout_date: after.checkout_date || null,
    })

    //if the user id has been filled for the reservation for the first time. i.e at checking in
    if(!before.user_id  && after.user_id){ 
        user_copy_after.role = 'primary'
        const update = firestore.collection(collections.user.main).doc(after.user_id).update({
            reservations: admin.firestore.FieldValue.arrayUnion(user_copy_after)
        })
       promises.push(update) 
    }else{
    // if there is difference in the data and there is user corresponding with the reservation
        if(!_.isEqual(user_copy_before, user_copy_after)){
            firestore.collection(`${collections.user.main}`).doc(after.user_id).get()
            .then((user_snapshot) => {
                if(user_snapshot.exists){
                    const user = user_snapshot.data()
                    let reservations = []
                    //loop through each of the user reservations to reset the reservations with updated data
                    user.reservations.forEach(reservation => {
                        if(reservation.id === user_copy_before.id){ 
                            user_copy_after.role = reservation.role || null; //update back the role
                            reservations.push(user_copy_after)
                        }else{
                            reservations.push(reservation)
                        }
                    });
                    promises.push(user_snapshot.ref.update({reservations:reservations})) 
                }
            })
            .catch(e => {
                console.log(e.message)
            })
        }
    }      


    const property_copy_before = helper.sortObject({
        id: before.id,
        name: before.name,
        checkin_date: before.checkin_date || null,
        checkout_date: before.checkout_date || null,
    })
    const property_copy_after = helper.sortObject({
        id: after.id,
        name: after.name,
        checkin_date: after.checkin_date || null,
        checkout_date: after.checkout_date || null,
    })

    // if there is difference in the data
    if(!_.isEqual(property_copy_before, property_copy_after)){
        firestore.collection(`${collections.property.main}`).doc(before.property_id).get()
        .then((property_snapshot) => {
            // confirm if the property exist
            if(property_snapshot.exists){ 
                const property = property_snapshot.data()
                let reservations = []
                //loop through each of the property reservations to reset the reservations with updated data
                property.reservations.forEach(reservation => {
                    if(reservation.id === property_copy_before.id){ 
                        reservations.push(property_copy_after)
                    }else{
                        reservations.push(reservation)
                    }
                });
                promises.push(property_snapshot.ref.update({reservations:reservations})) 
            }
            
        })
        .catch(e => {
            console.log(e.message)
        })
    }

    // if just approved
    if(!before.approved_at && after.approved_at){
      promises.push(notification.user(after.user_id, {
        text: `Your reservation checkin to ${after.property.name} has been approved`,
        type: notificationTypes.reservationCheckinApproval,
        payload: {
            reservation_id: snapshot.after.ref.id,
            property_id: after.property_id,
            }
        })) 
    }

    // resolve all promises
    if(promises.length > 0){
        return Promise.all(promises)
    }
    return null
})