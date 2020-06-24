const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const helper = require('../helper')
const collections = require('../enums/collections')

module.exports = functions.firestore.document(`/${collections.reservation.main}/{reservation_id}`)
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