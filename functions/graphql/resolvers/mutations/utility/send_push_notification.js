
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

    return await notification.push({
        user_id, token, payload
    });
 }
 
 module.exports = pushNotification;
 