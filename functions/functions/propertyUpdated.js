const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('../admin');
const helper = require('../helpers');
const collections = require('../enums/collections');

module.exports = functions.firestore.document(`/${collections.property.main}/{property_id}`)
.onUpdate((snapshot, context) => {
    let promises = [];

    /**
        * Update the property in the users documents
        */
    const before = snapshot.before.data();
    const after = snapshot.after.data();

    const user_copy_before = helper.sortObject(
        {
            city: before.address.city,
            country: before.address.country,
            id: before.id,
            image: before.image || null,
            name: before.name
        }
    );

    const user_copy_after = helper.sortObject(
        {
            city: after.address.city,
            country: after.address.country,
            id: after.id,
            image: before.image || null,
            name: after.name
        }
    );
    
    const firestore = admin.firestore();

    if(!_.isEqual(user_copy_before, user_copy_after)){
        //find all the users that has this property
        firestore.collection(`${collections.user.main}`).where('properties', 'array-contains', user_copy_before).get()
        .then((querySnapshot) => {
            querySnapshot.forEach(user_snapshot => {
                let user = user_snapshot.data();
                let properties = [];
                //loop through each of the user property to reset the properties with updated data
                user.properties.forEach(property => {
                    if(property.id === user_copy_before.id){ 
                        user_copy_after.role = property.role || null;
                        properties.push(user_copy_after);
                    }else{
                        properties.push(property);
                    }
                });
                promises.push(user_snapshot.ref.update({properties:properties})); 
            });
        })
        .catch(e => {
            console.log(e.message);
        });
    }


/**Update the property in reservations documents */

    const reservation_copy_before = helper.sortObject({
        city: before.address.city,
        country: before.address.country,
        id: before.id,
        image: before.image || null,
        name: before.name
    });

    const reservation_copy_after = helper.sortObject({
        city: after.address.city,
        country: after.address.country,
        id: after.id,
        image: after.image || null,
        name: after.name
    });

    if(!_.isEqual(reservation_copy_before, reservation_copy_after)){

        //find all the reservations that has this property
        firestore.collection(`${collections.reservation.main}`).where('property_id', '==', reservation_copy_before.id).get()
        .then(reservations_snapshot => {
            reservations_snapshot.forEach(reservation => {
                promises.push(reservation.ref.update({
                    property: reservation_copy_after
                }));
            });
        })
        .catch(e => {
            console.log(e.message);
        });
    }
    if(promises.length > 0){
        return Promise.all(promises);
    }
    return null;
});