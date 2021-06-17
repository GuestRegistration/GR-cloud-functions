const collections = require('../Enums/collections')
const firebaseAdmin = require('../../../../admin');

const propertySubscription = async (property_id) => {
    const firestore = firebaseAdmin.firestore();

    const subscription = await firestore.collection(collections.main).doc(property_id)
                                .collection(collections.meta.name)
                                .doc(collections.meta.documents.stripe_subscription)
                                .get();

    if(subscription.exists && ['active', 'trialing'].includes(subscription.data().status)){
        return subscription.data();
    }else{
        const property = await firestore.collection(collections.main).doc(property_id).get();
        const property_sub = property.data().subscription;
        if(property_sub && ['active', 'trialing', 'free'].includes(property_sub.status)) {
            return property_sub;
        }
        throw new Error("Property subscription not active");
    }
}

module.exports = propertySubscription;