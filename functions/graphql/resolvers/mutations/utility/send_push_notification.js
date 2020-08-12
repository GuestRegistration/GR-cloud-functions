
/**
 * Send sample push notification
 */

const admin = require('../../../../admin');
const notification = require('../../../../helper/notification');

const pushNotification = async (parent, {user_id, token, title, body}, context) => {

    const payload = {
        notification: {
            title, body
        }
    }

    const pushNotification = await notification.push({
        user_id, token, payload
    });

    return pushNotification.message;
 }
 
 module.exports = pushNotification;
 