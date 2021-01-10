/**
 * Get list of properties belonging to a user
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserProperties = async (parent, { id }, context) => {
    clientAuthorizedMiddleware(context);
    let user_id = null;

    //if an id was specified, perhaps for admin purpose
    if(!id){
        user_id = userAuthenticatedMiddleware(context);
    }
    let properties = [];
    if(user_id){

        const firestore = firebaseAdmin.firestore();
        const QuerySnapshots = await firestore.collection(collections.main).where('user_id', '==', user_id).get();
        
        QuerySnapshots.forEach((snapshot) => {
            let property = snapshot.data();
            property.id = snapshot.ref.id;
            properties.push(property);
        });        
    }
    return properties;
 };

 module.exports = getUserProperties;