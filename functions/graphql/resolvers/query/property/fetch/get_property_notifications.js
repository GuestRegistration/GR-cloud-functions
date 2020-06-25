/**
 * Get user notification
 */
const collections = require('../../../../../enums/collections')
const client_middleware = require('../../../../middleware/client_authorized')
const user_middleware = require('./../../../../middleware/user_authorized')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

 const getPropertyNotifications = async (parent, { property_id }, context) => {
    client_middleware(context);
    let notifications = [];

    const propertyDoc = await firestore.collection(collections.property.main).doc(property_id).get();
    if(propertyDoc.exists){
       const property = propertyDoc.data();
       user_middleware(context, [property.user_id]);

       const QuerySnapshots = await firestore.collection(collections.property.main).doc(property_id)
       .collection(collections.user.subcollections.notifications).get();

        QuerySnapshots.forEach((snapshot) => {
            let notification = snapshot.data()
            notification.id = snapshot.ref.id
            notifications.push(notification)
        })        
    }

    return notifications;
 }

 module.exports = getPropertyNotifications;