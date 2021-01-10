/**
 * Retrieve user identities
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


const getUserIdentities = async (parent, { id }, context) =>  {
    clientAuthorizedMiddleware(context);
    let user_id = null;
    
    //if an id was specified, perhaps for admin purpose
    if(!id){
        user_id = userAuthenticatedMiddleware(context);
    }
    const identites = [];
    if(user_id){
        const firestore = firebaseAdmin.firestore();
    
        const query = await firestore.collection(collections.main)
                            .doc(user_id)
                            .collection(collections.subcollections.identities)
                            .get();
        if(!query.empty){
            query.forEach( id => {
                identites.push({
                    id: id.id,
                    ref: id.ref.path,
                    ...id.data()
                });
            });
        }
        return identites;
    }

    return null;
};

module.exports = getUserIdentities;