
/**
 * Send push notification
 */
const config = require('../../../../config');
const { sendToDevice, sendToUser } = require('../../../../helpers/pushNotification');

const sendPushNotification = async (parent, {user_id, token, title, body, icon}, context) => {

    const payload = {
        notification: {
            title, 
            body,
            icon: icon ? icon : config.notification.defaultIcon
        }
    };

    let response = ""
    try {
        if(user_id){
            await sendToUser(user_id, payload);
        }else if(token.length){
            await sendToDevice(token.map(t => ({token})), payload)
        }
        response = "Notification sent"
    } catch (error) {
        response = `Notification failed--> ${error.message}`;
    }

    return response;
 };
 
 module.exports = sendPushNotification;
 