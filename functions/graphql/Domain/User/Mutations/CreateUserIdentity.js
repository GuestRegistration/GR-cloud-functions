/**
 * create user identity
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
   

const createUserIdentity = async (parent, {id, title, country, document_type, document_url}, context) => {
    clientAuthorizedMiddleware(context);
    userAuthorizedMiddleware(context, [id]);

    const firestore = firebaseAdmin.firestore();

    const identity = {
        user_id:id, title, country, document_type, document_url
    };

    const IdCollectionRef = firestore.collection(collections.main).doc(id)
                .collection(collections.subcollections.identities);

   const result = await IdCollectionRef.add(identity);
    await IdCollectionRef.doc(result.id).update({
        id: result.id,
        verified_at: null
    });

    const newId = await IdCollectionRef.doc(result.id).get();
    return {
        id: newId.ref.id,
        ref: newId.ref.path,
        ...newId.data(),
    };
};

module.exports = createUserIdentity;