/**
 * Get a reservation data
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const propertySubscriptionMiddleware = require('../../Property/Middlewares/propertySubscription')

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
            await propertySubscriptionMiddleware(propertyDoc.ref.id);
            
            const checkinRef = reservationRef.collection(collections.meta.name).doc(collections.meta.documents.checkin);
            const checkinDoc = await checkinRef.get();

            const verificationRef = reservationRef.collection(collections.meta.name).doc(collections.meta.documents.id_verification);
            const verificationDoc = await verificationRef.get();


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
                const verification = verificationDoc.exists ? verificationDoc.data() : null
                
                return {
                    user,
                    reservation,
                    checkin,
                    verification
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