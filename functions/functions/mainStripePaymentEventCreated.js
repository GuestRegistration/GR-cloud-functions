const functions = require('firebase-functions');
const collections = require('../enums/collections');
const events = require('../rest/stripe/events');
const admin = require('../admin');
const notification = require('../helpers/notification');
const notificationTypes = require('../enums/notifications');

module.exports = functions.firestore.document(`/${collections.system.main_stripe_payment_events}/{event_id}`)
.onCreate((snapshot, context) => {
    const event = snapshot.data();

    const firestore = admin.firestore();

    const object = event.data.object; 
    const metadata = object.metadata;
    const propertyId =  metadata.property_id;

    let property = null;

    const getProperty = () => {
        if(!propertyId) return Promise.resolve(property)
        if(property !== null) return Promise.resolve(property);
        
        const propertyRef = firestore.collection(collections.property.main).doc(propertyId);
        property = {
            ref: propertyRef,
            data: null,
            exists: false,
        }
        return propertyRef.get().then(snapshot => {
            property.exists = snapshot.exists;
            if(snapshot.exists){
                property.data = snapshot.data()
            } 
            return Promise.resolve(property)
        })
    }


    if(events.customer.includes(event.type) && event.data.object.object === 'customer'){
        const updateProperty = () => {
            return getProperty().then(property => {
                if(property && property.exists){
                    if(event.type === 'customer.deleted'){
                        return property.ref.collection(collections.property.meta.name).doc(collections.property.meta.documents.stripe_customer).delete();
                    }
                    return property.ref.collection(collections.property.meta.name).doc(collections.property.meta.documents.stripe_customer).set(object)
                }
                return Promise.resolve();
            })
        }
        return updateProperty();
    }

    if(events.customer_subscription.includes(event.type) && event.data.object.object === 'subscription'){
        const upadatePropertySubscription = () => {
            return getProperty()
            .then(property => {
                const promises = [];
                if(property && property.exists){
                    if(event.type === 'customer.subscription.deleted'){
                        promises.push(property.ref.collection(collections.property.meta.name).doc(collections.property.meta.documents.stripe_subscription).delete());
                    }else{
                        promises.push(property.ref.collection(collections.property.meta.name).doc(collections.property.meta.documents.stripe_subscription).set(object))
                    }      
                    promises.push(property.ref.update({
                        subscription: {
                            id: object.id,
                            status: object.status,
                            trial_start: object.trial_start,
                            trial_end: object.trial_end,
                            current_period_start: object.current_period_start,
                            current_period_end: object.current_period_end
                        }
                    })) 
                }

                return  Promise.all(promises);
            }) 
           
        }
        
        return upadatePropertySubscription();
    }

    return null
 });

