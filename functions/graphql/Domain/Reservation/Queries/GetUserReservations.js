/**
 * Get a user reservations list
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserReservations =  async (parent, { id }, context) => {
    clientAuthorizedMiddleware(context);
    let user_id = null;
    
    //if an id was specified, perhaps for admin purpose
    if(!id){
        user_id = userAuthenticatedMiddleware(context);
    }
    
    let reservations = [];

    if(user_id){
        const firestore = firebaseAdmin.firestore();
        const QuerySnapshots = await firestore.collection(collections.main).where('user_id', '==', user_id).get();
        
        QuerySnapshots.forEach((snapshot) => {
            reservations.push({
                id: snapshot.ref.id,
                ...snapshot.data()
            });
        });     
    }
    return reservations;
 };

 module.exports = getUserReservations;