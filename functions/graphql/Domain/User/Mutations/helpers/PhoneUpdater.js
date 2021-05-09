
/**
 * update user phone
 */

const collections = require('../../Enums/collections');
const admin = require('../../../../../admin');
const helper = require('../../../../../helpers');

const phoneUpdater = async ({id, phone, country_code, phone_number}) => {
    let update = {
        phone: phone || null,
        phone_meta: {
            country_code: country_code || null,
            phone_number: phone_number || null
        }
    };

    const firestore = admin.firestore();

    const userRef = firestore.collection(collections.main).doc(id);

    if(update.phone){
        const user_check_phone = await firestore.collection(collections.main).where('phone', '==', update.phone).get();
        if(user_check_phone.size > 0){
            user_check_phone.forEach(user => {
                if(user.ref.id !== id){
                    throw new Error('The phone number already being used by someone else');
                }
            });
        }
            
        // check if the phone number is valid
        if(!(await helper.validatePhoneNumber(update.phone)).valid){
            throw new Error('Invalid phone number');
        }
    }
    
    try {            
        update['timestamp.updated_at'] = helper.nowTimestamp();

        await userRef.update(update);

        await admin.auth().updateUser(id, {
            phoneNumber: update.phone 
        });

        return true;

    } catch (error) {
        throw new Error('Something went wrong '+error.message);
    }
};

module.exports = phoneUpdater;