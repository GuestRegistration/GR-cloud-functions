const config = require('../config');
const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require('../enums/collections');
const { sendToUser } = require('../helpers/pushNotification');

module.exports = functions.firestore.document(`/${collections.user.main}/{userId}/${collections.user.subcollections.notifications}/{notificationId}`)
.onCreate((snapshot, context) => {
    const notification = snapshot.data();
    const userId = context.params.userId;
    const firestore = admin.firestore();

    return firestore.collection(collections.user.main).doc(userId).get()
    .then(userSnapshot => {
        if(!userSnapshot.exists) return Promise.resolve();
        const user = userSnapshot.data();
        
        return sendToUser(userId,
            {
                notification: {
                    title: notification.type.replace(/\./g, ' ').toUpperCase(),
                    body: notification.text,
                    icon: user.image ? user.image : config.notification.defaultIcon
                }
            }
        )
    })
 });