const functions = require('firebase-functions')
const _ = require('lodash')
const admin = require('./admin')
const firestore = admin.firestore()
//our Apollo server setup
const configureServer = require("./graphql/server")
//initialize the server
const server = configureServer();
//helpers
const helper = require('./helper')
//collections enumeration
const collections = require('./enums/collections')

// create and export the api
exports.api = functions.https.onRequest(server);

// create user document when first authenticated
// exports.createUser = functions.auth.user().onCreate((user) => {
//     //create a user document when authenticated newly
//     return firestore.collection(`${collections.user.main}`).doc(user.uid).set({
//         id: user.uid,
//         email: user.email || null,
//         phone: user.phoneNumber || null
//     })
//   });

// when a new user is created
exports.onUserCreated = functions.firestore.document(`/${collections.user.main}/{user_id}`)
                        .onCreate((snapshot, context) => {

                        return snapshot.ref.update({
                                id: snapshot.id,
                                timestamp: {
                                    created_at: helper.nowTimestamp(), 
                                    updated_at: null,
                                    deleted_at: null
                                }
                            })
                            .then((update_result) => {
                                // initialize the user verification document
                                return snapshot.ref.collection(collections.user.meta.name)
                                    .doc(collections.user.meta.documents.verification)
                                    .set({
                                        user_id: snapshot.ref.id,
                                    })
                            })
                            .then((payment_document_result) => {
                                // initialize the user device document
                                return snapshot.ref.collection(collections.user.meta.name)
                                    .doc(collections.user.meta.documents.device)
                                    .set({
                                        user_id: snapshot.ref.id,
                                        device_id: null,
                                        device_name: null,
                                        device_ip: null,
                                        last_updated: null
                                    })
                            })
                            .then((device_document_result) => {
                                // add an initial payment method document.
                                return snapshot.ref.collection(collections.user.subcollections.payments)
                                .add({
                                    user_id: snapshot.ref.id
                                }) 
                            })
                         })



// when user document is updated
// exports.onUserUpdated = functions.firestore.document(`/${collections.user.main}/{user_id}`)
//                         .onUpdate((snapshot, context) => {
//                             const before = snapshot.before.data()
//                             const after = snapshot.after.data()
//                             return snapshot.after.ref.update({
//                                 id: snapshot.id,
//                                 timestamp: {
//                                     updated_at: helper.nowTimestamp(),
//                             } })
//                         })


// when new property is added
exports.onPropertyCreated = functions.firestore.document(`/${collections.property.main}/{property_id}`)
.onCreate((snapshot, context) => {
    // update the user document
    const property = snapshot.data()
    return  firestore.collection(`${collections.user.main}`).doc(`${property.user_id}`).get()
    .then((user_snapshot) => {
        const user = user_snapshot.data()
            return Promise.all([
                snapshot.ref.update({
                    id: snapshot.ref.id,
                    team: admin.firestore.FieldValue.arrayUnion({
                        name: user.name,
                        email: user.email,
                        role: 'owner'
                    }),
                    reservations: [],
                    timestamp: {
                        created_at: helper.nowTimestamp(), 
                        updated_at: null,
                        deleted_at: null
                    }
                }),
                //  add the property to the user document
                user_snapshot.ref.update({
                    properties: admin.firestore.FieldValue.arrayUnion({
                        id: snapshot.id,
                        name: property.name,
                        city: property.address.city,
                        country: property.address.country,
                        role: 'owner' //set the creator as owner by default
                    })
                })

            ])
    })

})

// when property document is updated
exports.onPropertyUpdated = functions.firestore.document(`/${collections.property.main}/{property_id}`)
.onUpdate((snapshot, context) => {
    let promises = [];

    /**
        * Update the property in the users documents
        */
    const before = snapshot.before.data()
    const after = snapshot.after.data()

    const user_copy_before = helper.sortObject(
        {
            city: before.address.city,
            country: before.address.country,
            id: before.id,
            image: before.image || null,
            name: before.name
        }
    ) 

    const user_copy_after = helper.sortObject(
        {
            city: after.address.city,
            country: after.address.country,
            id: after.id,
            image: before.image || null,
            name: after.name
        }
    )


    if(!_.isEqual(user_copy_before, user_copy_after)){
        //find all the users that has this property
        firestore.collection(`${collections.user.main}`).where('properties', 'array-contains', user_copy_before).get()
        .then((querySnapshot) => {
            querySnapshot.forEach(user_snapshot => {
                let user = user_snapshot.data()
                let properties = []
                //loop through each of the user property to reset the properties with updated data
                user.properties.forEach(property => {
                    if(property.id === user_copy_before.id){ 
                        user_copy_after.role = property.role || null
                        properties.push(user_copy_after)
                    }else{
                        properties.push(property)
                    }
                });
                promises.push(user_snapshot.ref.update({properties:properties})) 
            });
        })
        .catch(e => {
            console.log(e.message)
        })
    }


/**Update the property in reservations documents */

    const reservation_copy_before = helper.sortObject({
        city: before.address.city,
        country: before.address.country,
        id: before.id,
        image: before.image || null,
        name: before.name
    })

    const reservation_copy_after = helper.sortObject({
        city: after.address.city,
        country: after.address.country,
        id: after.id,
        image: after.image || null,
        name: after.name
    })

    if(!_.isEqual(reservation_copy_before, reservation_copy_after)){

        //find all the reservations that has this property
        firestore.collection(`${collections.reservation.main}`).where('property_id', '==', reservation_copy_before.id).get()
        .then(reservations_snapshot => {
            reservations_snapshot.forEach(reservation => {
                promises.push(reservation.ref.update({
                    property: reservation_copy_after
                }))
            })
        })
        .catch(e => {
            console.log(e.message)
        })
    }
    if(promises.length > 0){
        return Promise.all(promises)
    }
    return null
})

                        
// when new reservation is added
exports.onReservationCreated = functions.firestore.document(`/${collections.reservation.main}/{reservation_id}`)
.onCreate((snapshot, context) => {
    const reservation = snapshot.data()
    const propertyRef = firestore.collection(`${collections.property.main}`).doc(`${reservation.property_id}`);
    return propertyRef.get()
            .then((property_snapshot) => property_snapshot.data())
            .then((property) => {
                // update the reservation with the property information
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
                         reservations:  admin.firestore.FieldValue.arrayUnion({
                             id: snapshot.ref.id,
                             name: reservation.name,
                             checkin_date: reservation.checkin_date || null,
                             checkout_date: reservation.checkout_date || null,
                         })
                     })
                 ])
            
            })
})


// when property document is updated
exports.onReservationUpdated = functions.firestore.document(`/${collections.reservation.main}/{reservation_id}`)
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

    // resolve all promises
    if(promises.length > 0){
        return Promise.all(promises)
    }
    return null
})