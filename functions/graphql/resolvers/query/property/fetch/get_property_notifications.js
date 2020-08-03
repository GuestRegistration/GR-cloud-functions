/**
 * Get user notification
 */
const collections = require('../../../../../enums/collections')
const client_middleware = require('../../../../middleware/client_authorized')
const auth_middleware = require('../../../../middleware/user_authenticated')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

 const getPropertyNotifications = async (parent, args, context) => { 
    let notifications = [];
   
    client_middleware(context);
    user_id = auth_middleware(context);

    if(user_id){
        const QuerySnapshots = await firestore.collection(collections.property.main).where('user_id', '==', user_id).get()
        
        QuerySnapshots.forEach(async (snapshot) => {
            let property = snapshot.data();
            property.id = snapshot.ref.id;
            let propertyNotifications = await firestore.collection(collections.property.main).doc(property.id)
                .collection(collections.property.subcollections.notifications).get();

            propertyNotifications.forEach((notificationSnapshot) => {
                let notification = notificationSnapshot.data()
                notification = notificationSnapshot.data();
                notification.id = notificationSnapshot.ref.id;
                notification.property = property;
                notifications.push(notification)
            })  
        })        
    }

    return notifications;
 }

 module.exports = getPropertyNotifications;