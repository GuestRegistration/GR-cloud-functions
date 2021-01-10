
/**
 * delete a user notification
 * 
 * */ 
 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');


const deleteUserNotification = async (parent, {id}, context) => {
    clientAuthorizedMiddleware(context);
    user_id = userAuthenticatedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const notification = await firestore.collection(collections.main).doc(user_id)
                            .collection(collections.subcollections.notifications)
                            .doc(id).delete();
                            
    if(notification.writeTime) return true;
    return false;

};

module.exports = deleteUserNotification;