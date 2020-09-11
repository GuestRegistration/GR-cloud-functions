
/**
 * Send sample push notification
 */

const push = require('../../../../helper/push_notification');

const pushNotification = async (parent, {user_id, token, title, body}, context) => {

    const payload = {
        notification: {
            title, body
        }
    }

    return await push({
        user_id, token, payload
    });

 }
 
 module.exports = pushNotification;
 