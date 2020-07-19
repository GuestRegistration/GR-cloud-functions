const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const helper = require('../helper')
const collections = require('../enums/collections')

module.exports = functions.firestore.document(`/${collections.property.main}/{property_id}`)
.onCreate((snapshot, context) => {
    // update the user document
    const property = snapshot.data()
    
    
    return  firestore.collection(collections.user.main).doc(property.user_id).get()
    .then((user_snapshot) => {
        let promises = []
        const user = user_snapshot.data()
        
        promises.push(snapshot.ref.update({
            id: snapshot.ref.id,
            team: user_snapshot.exists ?  admin.firestore.FieldValue.arrayUnion({
                    name: user.name,
                    email: user.email,
                    role: 'owner'
                }): [],
            reservations: [],
            timestamp: {
                created_at: helper.nowTimestamp(), 
                updated_at: null,
                deleted_at: null
            }
        }))

        // update the users document with the property
        if(user_snapshot.exists){
            promises.push(user_snapshot.ref.update({
                properties: admin.firestore.FieldValue.arrayUnion({
                    id: snapshot.id,
                    name: property.name,
                    city: property.address.city,
                    country: property.address.country,
                    role: 'owner' //set the creator as owner by default
                })
            }))
        }

        return Promise.all(promises)
    })

})