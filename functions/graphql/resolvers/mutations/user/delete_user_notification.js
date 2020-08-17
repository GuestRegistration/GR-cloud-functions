
/**
 * delete a user notification
 * 
 * */ 
 //  middlewares
 const client_middleware = require('../../../middleware/client_authorized')

const admin = require('../../../../admin')
const firestore = admin.firestore()
const collections = require('../../../../enums/collections')
const auth_middleware = require('../../../middleware/user_authenticated')


const deleteUserNotification = async (parent, {id}, context) => {
    client_middleware(context);
    user_id = auth_middleware(context);

    const notification = await firestore.collection(collections.user.main).doc(user_id)
                            .collection(collections.user.subcollections.notifications)
                            .doc(id).delete();
                            
    if(notification.writeTime) return true;
    return false;

}

module.exports = deleteUserNotification;