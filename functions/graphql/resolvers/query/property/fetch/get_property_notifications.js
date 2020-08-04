/**
 * Get user notification
 */
const collections = require('../../../../../enums/collections')
const client_middleware = require('../../../../middleware/client_authorized')
const auth_middleware = require('../../../../middleware/user_authenticated')
const admin = require('../../../../../admin')
const { property } = require('../../../../../enums/collections')
const firestore = admin.firestore()

 const getPropertyNotifications = async (parent, args, context) => { 
    let notifications = [];

    client_middleware(context);
    user_id = auth_middleware(context)

    if(user_id){
        const QuerySnapshots = await firestore.collection(collections.property.main).where('user_id', '==', user_id).get()
        const notificationPromises = [];

        QuerySnapshots.forEach(snapshot => {
            let property = snapshot.data();
            property.id = snapshot.ref.id;
            notificationPromises.push(getNotifications(property));
        });

        (await Promise.all(notificationPromises))
        .forEach(response => {
            response.snapshot.forEach( notification => {
                notifications.push({
                    ...notification.data(),
                    property: response.property
                })
            })
        });
    }

    return notifications;           
 }

 const getNotifications = (property) => {
    return new Promise((resolve, reject) => {
        firestore.collection(collections.property.main).doc(property.id)
        .collection(collections.property.subcollections.notifications).get()
        .then(snapshot => {
            resolve({snapshot, property});
        })
    });
 }

 module.exports = getPropertyNotifications;