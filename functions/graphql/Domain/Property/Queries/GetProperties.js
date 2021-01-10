/**
 * Get list of properties
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

 const getProperties = async (parent, args, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const properties = [];
    const QuerySnapshots = await firestore.collection(collections.main).get();
    
    QuerySnapshots.forEach((snapshot) => {
        let property = snapshot.data();
        property.id = snapshot.ref.id;
        properties.push(property);
    });     
    return properties;

 };

 module.exports = getProperties;