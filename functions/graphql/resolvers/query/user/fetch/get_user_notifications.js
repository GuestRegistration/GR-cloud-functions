/**
 * Get user notification
 */
const collections = require('../../../../../enums/collections')
const client_middleware = require('../../../../middleware/client_authorized')
const auth_middleware = require('../../../../middleware/user_authenticated')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

 const getUserNotifications = async (parent, args, context) => {
    client_middleware(context)
    user_id = auth_middleware(context)
    let notifications = [];
    const QuerySnapshots = await firestore.collection(collections.user.main).doc(user_id)
                            .collection(collections.user.subcollections.notifications).get();
        
    QuerySnapshots.forEach((snapshot) => {
        let notification = snapshot.data()
        notification.id = snapshot.ref.id
        notifications.push(notification)
    })        

    return notifications;
 }

 module.exports = getUserNotifications;