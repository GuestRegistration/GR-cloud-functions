const collections = require('../Enums/collections')
const firebaseAdmin = require('../../../../admin');

const propertySubscription = async (property_id) => {
    const firestore = firebaseAdmin.firestore();
    const subscription = await firestore.collection(collections.main).doc(property_id)
                                .collection(collections.meta.name)
                                .doc(collections.meta.documents.stripe_subscription)
                                .get();

    if(subscription.exists && (subscription.data().status === 'active' || subscription.data().status === 'trialing')){
        return subscription.data();
    }else{
        throw new Error("Property subscription not active");
    }
}

module.exports = propertySubscription;