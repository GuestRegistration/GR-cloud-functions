
/**
 * Send push notification
 */
const config = require('../../../../config');
const pushNotification = require('../../../../helpers/PushNotification');

const sendPushNotification = async (parent, {user_id, token, title, body, icon}, context) => {

    const payload = {
        notification: {
            title, body,
            icon: icon ? icon : config.notification.defaultIcon
        }
    };

    return await pushNotification({
        user_id, token, payload
    });

 };
 
 module.exports = sendPushNotification;
 