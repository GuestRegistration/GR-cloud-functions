const admin = require('../admin')
const firestore = admin.firestore()
const collections = require('../enums/collections')
const helper = require('./index');

module.exports = {
    user: async (userId, notification = {}) => {
        notification.timestamp = helper.nowTimestamp()
        notification.read = false;

        this.push({
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

        this.push({
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

    push: async ({user_id, token, payload}) => {
        const response = {
            sent: false,
            error: null,
            message: ''
        }
        let notification_token = token;
        if(!notification_token && user_id){
            const deviceSnapshot  = await firestore.collection(collections.user.main)
                                .doc(user_id)
                                .collection(collections.user.meta.name)
                                .doc(collections.user.meta.documents.device)
                                .get();

            notification_token = deviceSnapshot.data() ? deviceSnapshot.data().notification_token : null;
        }
        if(notification_token){
            const notification = await admin.messaging().sendToDevice(notification_token, payload);
            const error = notification.results[0].error;
            if (error){
                response.error = error;
                response.message = `Failure sending notification to ${notification_token}: ${error.code}`
            }else{
                response.sent = true;
                response.message = `Notification sent to ${notification_token}`
            }
        }
        return response;
    }
}
