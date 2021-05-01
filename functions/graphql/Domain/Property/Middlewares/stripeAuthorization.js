const collections = require('../Enums/collections')
const firebaseAdmin = require('../../../../admin');

const stripeAuthorization = async (property_id) => {
    const firestore = firebaseAdmin.firestore();
    const stripe_authorization = await firestore.collection(collections.main).doc(property_id)
                                .collection(collections.meta.name)
                                .doc(collections.meta.documents.stripe_authorization)
                                .get();

    if(stripe_authorization.exists && stripe_authorization.data().stripe_user_id){
        return stripe_authorization.data();
    }else{
        throw new Error("Property not connected to stripe");
    }
}

module.exports = stripeAuthorization