
/**
 * update user email
 */

//  middlewares 
const collections = require('../../Enums/collections');
const admin = require('../../../../../admin');
const helper = require('../../../../../helpers');

const emailUpdater = async ({id, email}) => {

    const firestore = admin.firestore();

    const userRef = firestore.collection(collections.main).doc(id);
    const user = await userRef.get();

        const user_check_email = await firestore.collection(collections.main).where('email', '==', email).get();
        if(user_check_email.size > 0){
            user_check_email.forEach(user => {
                if(user.ref.id !== id){
                    throw new Error('The email already being used by someone else');
                }
            });
        }
       
        try {
            update['timestamp.updated_at'] = helper.nowTimestamp();
            await firestore.collection(collections.main).doc(id).update(update);

            await admin.auth().updateUser(user.ref.id, { email });

            return true;
        } catch (error) {
            throw new Error('Something went wrong '+error.message);
        }
    };

module.exports = emailUpdater;