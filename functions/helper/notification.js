const admin = require('../admin')
const firestore = admin.firestore()
const collections = require('../enums/collections')
const helper = require('./index');
const pushNotification = require('./push_notification');

const Notification =  {
    
    user: async (userId, notification = {}) => {
        notification.timestamp = helper.nowTimestamp()
        notification.read = false;

        await pushNotification({
            user_id: userId,
            payload: {
                notification: {
                    title: notification.type.replace('.', ' ').toUpperCase(),
                    body: notification.text,
                }
            }
        });

        return firestore.collection(collections.user.main).doc(userId)
                .collection(collections.user.subcollections.notifications)
                .add(notification);

    },
    
    property: async (propertyId, notification = {}) => {
        notification.timestamp = helper.nowTimestamp()
        notification.read = false;

        const propertySnapshot  = await firestore.collection(`${collections.property.main}`).doc(propertyId).get();

        await pushNotification({
            user_id: propertySnapshot.data().user_id,
            payload: {
                notification: {
                    title: notification.type.replace('.', ' ').toUpperCase(),
                    body: notification.text,
                }
            }
        });

        return firestore.collection(collections.property.main).doc(propertyId)
                .collection(collections.property.subcollections.notifications)
                .add(notification)
    },
    
}



module.exports = Notification;