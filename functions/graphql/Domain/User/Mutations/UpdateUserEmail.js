
const clientMiddleware = require('../../../Middlewares/ClientAuthorized');
const userMiddleware = require('../../../Middlewares/UserAuthorized');
const emailUpdate = require('./helpers/EmailUpdater');

const updateUserEmail = async (parent, {id, email}, context) => {
    clientMiddleware(context);
    userMiddleware(context, [id]);

    return await emailUpdate({id, email});
};

module.exports = updateUserEmail;