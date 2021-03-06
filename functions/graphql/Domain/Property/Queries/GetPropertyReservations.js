/**
 * Get list of property reservations
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../Middlewares/propertySubscription')
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


const getPropertyReservations = async (parent, {id}, context) =>  {
        clientAuthorizedMiddleware(context);

        const firestore = firebaseAdmin.firestore();

        //first get the property
       const property = await firestore.collection(collections.main).doc(id).get();
       if(property.exists){
            const reservations = [];

            userAuthorizedMiddleware(context, [property.data().user_id]);
            await propertySubscriptionMiddleware(id);

           const QuerySnapshots = await firestore.collection(collections.main).where('property.id', '==', id).get();
           QuerySnapshots.forEach((snapshot) => {
               let r = snapshot.data();
               r.id = snapshot.ref.id;
               reservations.push(r);
           });
           return reservations;
       }else{
           throw new Error('The property does not exist');
       }
};

module.exports = getPropertyReservations;