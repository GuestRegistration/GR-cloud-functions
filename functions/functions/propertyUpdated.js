const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('../admin');
const helper = require('../helpers');
const collections = require('../enums/collections');

module.exports = functions.firestore.document(`/${collections.property.main}/{propertyId}`)
.onUpdate((snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    const firestore = admin.firestore();
    const propertyId = context.params.propertyId;
    const promises = [];

    /**
    * Update the property in the users documents
    */
    const user_copy_before = {
        address: before.full_address || null,
        id: propertyId,
        image: before.image || null,
        name: before.name
    } 

    const user_copy_after = {
        address: after.full_address  || null,
        id: propertyId,
        image: after.image || null,
        name: after.name
    }        

    const owner_copy_before = helper.sortObject(
        {
            ...user_copy_before,
            role: 'owner'
        }
    );

    const owner_copy_after = helper.sortObject(
        {
            ...user_copy_after,
            role: 'owner'
        }
    );

    if(!_.isEqual(owner_copy_before, owner_copy_after)){
        promises.push(
            firestore.collection(collections.user.main).where('properties', 'array-contains', owner_copy_before).get()
            .then((querySnapshot) => {
                const user_updates = [];
                
                querySnapshot.forEach(user_snapshot => {
                    const user = user_snapshot.data();
                    const properties = user.properties.map(property => {
                        if(property.id === owner_copy_before.id){ 
                            return owner_copy_after;
                        }
                        return property;
                    });
                    user_updates.push(user_snapshot.ref.update({properties})); 
                });

                return Promise.all(user_updates)
            })
        )
    }


/**Update the property in reservations documents */

    const reservation_copy_before = helper.sortObject({
        address: before.full_address  || null,
        id: propertyId,
        image: before.image || null,
        name: before.name
    });

    const reservation_copy_after = helper.sortObject({
        address: after.full_address || null,
        id: propertyId,
        image: after.image || null,
        name: after.name
    });


    if(!_.isEqual(reservation_copy_before, reservation_copy_after)){
        promises.push(
            firestore.collection(collections.reservation.main).where('property_id', '==', reservation_copy_before.id).get()
            .then(reservations_snapshot => {
                const reservation_updates = []
                reservations_snapshot.forEach(reservation => {
                    reservation_updates.push(reservation.ref.update({
                        property: reservation_copy_after
                    }));
                });
                return Promise.all(reservation_updates)
            })
        );
    }

    return Promise.all(promises);
});