/**
 * Retrieve user by id
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const helpers = require( '../../../../helpers');

const getUserIdentityById = async (parent, {user_id, identity_id}, context) =>  {
    clientAuthorizedMiddleware(context);
    const auth = userAuthenticatedMiddleware(context);
    const firestore = firebaseAdmin.firestore();

    const idRef = firestore.collection(collections.main)
                            .doc(user_id)
                            .collection(collections.subcollections.identities)
                            .doc(identity_id);
    
    const snapshot = await idRef.get();
    if(snapshot.exists){
        const identity = snapshot.data();
        identity.id = snapshot.ref.id;

        // update the view history
        await idRef.collection('access_history').add({
            user_id: auth,
            client: context.auth.client_token,
            accessed_at: helpers.nowTimestamp()
        });

        return identity;
    }
    return null;
};

module.exports = getUserIdentityById;