/**
 * Get a reservation data
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const userCollections = require('../../User/Enums/collections');
const propertyCollections = require('../../Property/Enums/collections');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
// const helper = require('../../../../helpers');


const getReservationCheckin = async (parent, {id}, context) => {
    clientAuthorizedMiddleware(context);
    
    const firestore = firebaseAdmin.firestore();

    const reservationRef = firestore.collection(collections.main).doc(id);
    const reservationDoc = await reservationRef.get();

    if(reservationDoc.exists){
        const reservation = {
            id: reservationDoc.ref.id,
            ...reservationDoc.data()
        };

        const propertyRef = firestore.collection(propertyCollections.main).doc(reservation.property_id);
        const propertyDoc = await propertyRef.get();

        if(propertyDoc.exists){

            const auth = userAuthenticatedMiddleware(context);
            userAuthorizedMiddleware(context, [propertyDoc.data().user_id, reservation.user_id]);

            const checkinRef = reservationRef.collection(collections.meta.name).doc(collections.meta.documents.checkin);
            const checkinDoc = await checkinRef.get();

            // check if the reservation is already checked in
            if(reservation.checkedin_at && checkinDoc.exists){
                const checkin = {
                    id: checkinDoc.ref.id,
                    ...checkinDoc.data()
                };
                 
                // get the user data
                const userRef = firestore.collection(userCollections.main).doc(reservation.user_id);
                const userDoc = await userRef.get();
                const user = userDoc.exists ? {
                    id: userDoc.ref.id,
                    ...userDoc.data()
                } : null

                // get the verification data
                const verifications = [];
                const verificationsQuery = await userRef.collection(userCollections.subcollections.stripe_identity_verifications)
                .where('property_id', "==", propertyDoc.ref.id).get();
                if(!verificationsQuery.empty){
                    verificationsQuery.forEach(vSnapshot => {
                        verifications.push(vSnapshot.data())
                    })
                }

                return {
                    user,
                    reservation,
                    checkin,
                    verifications
                };
            }else{
                throw new Error("The reservation is not checked in yet");
            }      
        }else{
            throw new Error("The affiliated property cannot be found");
        }
    }else{
        throw new Error("The reservation does not exist");
    }
};

module.exports = getReservationCheckin;