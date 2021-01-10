
/**
 * Get list of users
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


const getUsers = async (parent, args, context) => {
    clientAuthorizedMiddleware(context);
    const firestore = firebaseAdmin.firestore();

    const users = [];
    const QuerySnapshots = await firestore.collection(collections.main).where('timestamp.deleted_at', '==', null).get();
    
    QuerySnapshots.forEach((snapshot) => {
        users.push(snapshot.data());
    });
    
    return users;
};

module.exports = getUsers;
