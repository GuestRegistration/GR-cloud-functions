
/**
 * update user phone
 */

//  middlewares
const clientMiddleware = require('../../../Middlewares/ClientAuthorized');
const userMiddleware = require('../../../Middlewares/UserAuthorized');
const phoneUpdate = require('./helpers/PhoneUpdater');

const updateUserPhone = async (parent, {id, phone, country_code, phone_number}, context) => {
    clientMiddleware(context);
    userMiddleware(context, [id]);

    return await phoneUpdate({id, phone, country_code, phone_number})
};

module.exports = updateUserPhone;