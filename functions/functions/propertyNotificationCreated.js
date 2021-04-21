const config = require('../config');
const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require('../enums/collections');
const { sendToUser } = require('../helpers/pushNotification');

module.exports = functions.firestore.document(`/${collections.property.main}/{propertyId}/${collections.property.subcollections.notifications}/{notificationId}`)
.onCreate((snapshot, context) => {
    const notification = snapshot.data();
    const propertyId = context.params.propertyId;

    const firestore = admin.firestore();

    return firestore.collection(collections.property.main).doc(propertyId).get()
    .then(propertySnapshot => {
        if(!propertySnapshot.exists) return Promise.resolve()

        const property = propertySnapshot.data();
        return sendToUser(property.user_id,
            {
                notification: {
                    title: notification.type.replace(/\./g, ' ').toUpperCase(),
                    body: notification.text,
                    icon: property.image ? property.image : config.notification.defaultIcon
                }
            }
        )
    })
 });