
/**
 * update user
 */

//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const helpers = require( '../../../../helpers');

const emailUpdate = require('./helpers/EmailUpdater');
const phoneUpdate = require('./helpers/PhoneUpdater');


const updateUser = async (parent, {id, email, phone, phone_country_code, phone_number, first_name, last_name}, context) => {
    clientAuthorizedMiddleware(context);
    userAuthorizedMiddleware(context, [id]);

    const firestore = firebaseAdmin.firestore();

    const userRef = firestore.collection(collections.main).doc(id);

        await emailUpdate({ id, email });
        await phoneUpdate({ id, phone, phone_country_code, phone_number });
        
        try {        
            await userRef.update({
                "name.first_name" : first_name,
                "name.last_name": last_name,
                "timestamp.updated_at": helpers.nowTimestamp()
            });
            return (await userRef.get()).data();
            
        } catch (error) {
            throw new Error('Something went wrong '+error.message);
        }
    };

module.exports = updateUser;