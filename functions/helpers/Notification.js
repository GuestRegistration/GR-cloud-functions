const admin = require('../admin');
const helper = require('.');
const pushNotification = require('./pushNotification');
const userCollections = require('../graphql/Domain/User/Enums/collections');
const propertyCollections = require('../graphql/Domain/Property/Enums/collections');

const firestore = admin.firestore();

const notification =  {
    
    user: async (userId, notification = {}) => {

        notification.timestamp = helper.nowTimestamp();
        notification.read = false;

        await pushNotification({
            user_id: userId,
            payload: {
                notification: {
                    title: notification.type.replace(/\./g, ' ').toUpperCase(),
                    body: notification.text,
                }
            }
        });

        return firestore.collection(userCollections.main).doc(userId)
                .collection(userCollections.subcollections.notifications)
                .add(notification);

    },
    
    property: async (propertyId, notification = {}) => {
        notification.timestamp = helper.nowTimestamp();
        notification.read = false;

        const propertySnapshot  = await firestore.collection(`${propertyCollections.main}`).doc(propertyId).get();

        await pushNotification({
            user_id: propertySnapshot.data().user_id,
            payload: {
                notification: {
                    title: notification.type.replace(/\./g, ' ').toUpperCase(),
                    body: notification.text,
                }
            }
        });

        return firestore.collection(propertyCollections.main).doc(propertyId)
                .collection(propertyCollections.subcollections.notifications)
                .add(notification);
    },
    
};

module.exports = notification;
