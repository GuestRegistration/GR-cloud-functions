
/**
 * 
 * update user address
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');

const updateUserAddress = async (parent, {id, full_address, street, city, state, country, postal_code}, context) => {
    clientAuthorizedMiddleware(context);
    userAuthorizedMiddleware(context, [id]);

    const address = {street, city, country, state, postal_code};

    const firestore = firebaseAdmin.firestore();

    await firestore.collection(collections.main).doc(id).update({full_address, address});

    return address;
};

module.exports = updateUserAddress;