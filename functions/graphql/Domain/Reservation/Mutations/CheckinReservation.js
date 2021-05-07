/**
 * check in reservation
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const propertySubscriptionMiddleware = require('../../Property/Middlewares/propertySubscription')

 const collections = require('../Enums/collections');
 const userCollections = require('../../User/Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 const helper = require('../../../../helpers');


 const checkinReservation = async (parent, {reservation_id, agreements, questions, credit_card}, context) => {
     clientAuthorizedMiddleware(context);
     const auth = userAuthenticatedMiddleware(context);
     
     if(auth){
        const firestore = firebaseAdmin.firestore();

        const userRef = firestore.collection(userCollections.main).doc(auth);
        const reservationRef = firestore.collection(collections.main).doc(reservation_id);

        const user = await userRef.get();
        if(user.exists){
            let reservation = await reservationRef.get();
            if(reservation.exists){

                await propertySubscriptionMiddleware(reservation.data().property_id);

                const checkin = {
                    name: user.data().name,
                    agreements: agreements,
                    questions: questions,
                    credit_card: credit_card,
                    checkedin_at: helper.nowTimestamp()
                };

                // create the checkin document
                await firestore.collection(collections.main)
                        .doc(reservation_id)
                        .collection(collections.meta.name)
                        .doc(collections.meta.documents.checkin)
                        .set(checkin);

                // update the reservation document
                await reservationRef.update({
                    user_id: user.ref.id,
                    checkedin_at: checkin.checkedin_at
                });
                return (await reservationRef.get()).data(); //refetch the reservation data
            }else{
                throw new Error('Reservation not found');
            }
        }else{
            throw new Error('User not found');
        }
    }
    
    return null;
    
};

 module.exports = checkinReservation;