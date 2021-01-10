/**
 * Get list of property rules
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertRules = async (parent, {id}, context) =>  {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const rules = await firestore.collection(collections.main).doc(id)
                                .collection(collections.meta.name)
                                .doc(collections.meta.documents.rules)
                                .get();
    if(rules.exists){
        return rules.data();
    }
    return null;
    
};

module.exports = getPropertRules;