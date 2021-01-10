/**
 * Retrieve user identity by reference
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const firebaseAdmin = require('../../../../admin');
const helpers = require('../../../../helpers');

const getUserIdentityByRef = async (parent, { ref }, context) =>  {
    clientAuthorizedMiddleware(context);
    const auth = userAuthenticatedMiddleware(context);
    const firestore = firebaseAdmin.firestore();

    const idRef = firestore.doc(ref);
    
    if(auth){
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
    }
    return null;
};

module.exports = getUserIdentityByRef;
