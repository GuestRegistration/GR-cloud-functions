const admin = require('../admin');
const helper = require('.');
const userCollections = require('../graphql/Domain/User/Enums/collections');
const propertyCollections = require('../graphql/Domain/Property/Enums/collections');

const firestore = admin.firestore();

const notification =  {
    
    user: (userId, notification = {}) => {

        return firestore.collection(userCollections.main).doc(userId)
                .collection(userCollections.subcollections.notifications)
                .add({
                    ...notification,
                    timestamp:  helper.nowTimestamp(),
                    read: false
                });
    },
    
    property: (propertyId, notification = {}) => {

        return firestore.collection(propertyCollections.main).doc(propertyId)
                .collection(propertyCollections.subcollections.notifications)
                .add({
                    ...notification,
                    timestamp:  helper.nowTimestamp(),
                    read: false
                });
    },
    
};

module.exports = notification;
