const firebaseAdmin = require('../../../../admin');
const userCollections = require('../../User/Enums/collections');
const propertyCollections = require('../../Property/Enums/collections');
const reservationCollections = require('../../Reservation/Enums/collections');

const firestore = firebaseAdmin.firestore();

const normalization = async () => {
    // try {
        
    //     await Promise.all([].concat(
    //         (await normalizeUserProperties()), 
    //         (await normalizeReservationProperties()), 
    //         (await normalizeUserReservationProperties()) 
    //     ));

    //     return true;
    // } catch (error) {
    //     console.log(error);
    //     return false;
    // }
    
    return true;
    
}


const normalizeUserProperties = async () => {
    const promises = [];
    const usersSnapshot = firestore.collection(userCollections.main).get();
    (await usersSnapshot).forEach(async (snapshot) => {
        let user = snapshot.data();
        let formerProperties = user.properties;
        if(formerProperties && formerProperties instanceof Array && formerProperties.length){

            let propertiesSnapshot = await Promise.all(formerProperties.map( (property) => {
                return firestore.collection(propertyCollections.main).doc(property.id).get();
            }))

            let properties = propertiesSnapshot.map( pS => {
                if(pS.exists){
                    let data =  pS.data();
                    return {
                        address: data.full_address || null,
                        id: pS.ref.id,
                        image: data.image || null,
                        name: data.name || null
                    }
                }
                return {
                    address: null,
                    id: null,
                    image: null,
                    name: null
                }
            })                
            promises.push(firestore.doc(snapshot.ref.path).update({ properties }))
        }
    });
    return promises;
}

const normalizeUserReservationProperties = async () => {
    const promises = [];
    const usersSnapshot = firestore.collection(userCollections.main).get();
    (await usersSnapshot).forEach(async (snapshot) => {
        let user = snapshot.data();
        let formerReservations = user.reservations;
        if(formerReservations && formerReservations instanceof Array && formerReservations.length){

            let reservationsSnapshot = await Promise.all(formerReservations.map( (reservation) => {
                return firestore.collection(reservationCollections.main).doc(reservation.id).get();
            }))

            let reservations = reservationsSnapshot.map( rS => {
                if(rS.exists){
                    let data =  rS.data();
                    return {
                        id: data.id,
                        name: data.name,
                        property_id: data.property.id,
                        property_name: data.property.name,
                        property_address: data.property.address || null,
                        checkin_date: data.checkin_date || null,
                        checkout_date: data.checkout_date || null,
                    }
                }
                return {
                    id: null,
                    name: null,
                    property_id: null,
                    property_name: null,
                    property_address: null,
                    checkin_date: null,
                    checkout_date: null,
                }
            })                
            promises.push(firestore.doc(snapshot.ref.path).update({ reservations }))
        }
    });
    return promises;
}


const normalizeReservationProperties = async () => {
    const promises = [];
    const reservationsSnapshot = firestore.collection(reservationCollections.main).get();
    (await reservationsSnapshot).forEach(async (snapshot) => {
        let reservation = snapshot.data();
        let formerProperty = reservation.property;
        if(formerProperty){
            let property = formerProperty;
            let pS = await firestore.collection(propertyCollections.main).doc(formerProperty.id).get()
                if(pS.exists){
                    let data =  pS.data();
                    property = {
                        address: data.full_address || null,
                        id: pS.ref.id,
                        image: data.image || null,
                        name: data.name || null
                    }
                }
            promises.push(firestore.doc(snapshot.ref.path).update({ property }))
        }
    });

    return promises;
}

module.exports = normalization;
