/**
 * Get user notifications
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../../User/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserNotifications = async (parent, args, context) => {
    clientAuthorizedMiddleware(context);
    let user_id = userAuthenticatedMiddleware(context);
    let notifications = [];

    if(user_id){
        const firestore = firebaseAdmin.firestore();
        const QuerySnapshots = await firestore.collection(collections.main).doc(user_id)
                                .collection(collections.subcollections.notifications).get();

        QuerySnapshots.forEach((snapshot) => {
            let notification = snapshot.data();
            notification.id = snapshot.ref.id;
            notifications.push(notification);
        });
    }
         
    return notifications.sort((a,b) => b.timestamp - a.timestamp);
 };

 module.exports = getUserNotifications;