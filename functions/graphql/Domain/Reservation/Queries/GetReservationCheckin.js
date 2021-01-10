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
const helper = require('../../../../helpers');


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
            userAuthorizedMiddleware(context, [propertyDoc.data().user_id]);
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
                const user = {
                    id: userDoc.ref.id,
                    ...userDoc.data()
                };

                // get the identity data
                let identity = null;
                if(checkin.identity_ref){
                    const idRef = firestore.doc(checkin.identity_ref);
                    const snapshot = await idRef.get();
                    if(snapshot.exists){
                        identity = {
                            id: snapshot.ref.id,
                            ...snapshot.data()
                        } ;

                        // update the view history
                        // await idRef.collection('access_history').add({
                        //     user_id: auth,
                        //     client: context.auth.client_token,
                        //     accessed_at: helper.nowTimestamp()
                        // });
                    }
                }
                return {
                    user,
                    reservation,
                    checkin,
                    identity
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