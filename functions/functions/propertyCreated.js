const _ = require('lodash');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const admin = require('../admin');
const helper = require('../helpers');
const collections = require('../enums/collections');

module.exports = functions.firestore.document(`/${collections.property.main}/{propertyId}`)
.onCreate((snapshot, context) => {
    // update the user document
    const property = snapshot.data();
    const firestore = admin.firestore();

    return  firestore.collection(collections.user.main).doc(property.user_id).get()
    .then((user_snapshot) => {
        let promises = [];
        const user = user_snapshot.data();
        
        promises.push(snapshot.ref.update({
            id: snapshot.ref.id,
            team: user_snapshot.exists ?  firebase.firestore.FieldValue.arrayUnion({
                    id: user_snapshot.ref.id,
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
        }));

        // update the users document with the property
        if(user_snapshot.exists){
            promises.push(user_snapshot.ref.update({
                properties: firebase.firestore.FieldValue.arrayUnion({
                    id: snapshot.ref.id,
                    name: property.name,
                    address: property.full_address,
                    image: property.image,
                    role: 'owner' //set the creator as owner by default
                })
            }));
        }
        
        return Promise.all(promises);
    });

});