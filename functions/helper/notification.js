const admin = require('../admin')
const firestore = admin.firestore()
const collections = require('../enums/collections')
const helper = require('./index');

module.exports = {
    user: (userId, notification = {}) => {
        notification.timestamp = helper.nowTimestamp()
        notification.read = false
    
        return firestore.collection(collections.user.main).doc(userId)
                .collection(collections.user.subcollections.notifications)
                .add(notification)
    },
    property: (propertyId, notification = {}) => {
        notification.timestamp = helper.nowTimestamp()
        notification.read = false
    
        return firestore.collection(collections.property.main).doc(propertyId)
                .collection(collections.property.subcollections.notifications)
                .add(notification)
    }
}
