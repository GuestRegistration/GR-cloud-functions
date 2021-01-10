
/**
 * Add a new user
 */
 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 const helper = require( '../../../../helpers');


const createUser = async (parent, {id, email, phone, phone_country_code, phone_number, first_name, last_name, device_id, device_ip, device_name, notification_token}, context) => {
        clientAuthorizedMiddleware(context);

        let user = {
            email,
            phone,
            phone_meta: {
                country_code: phone_country_code,
                phone_number: phone_number,
            },
            name:{
                first_name,
                last_name
            }
        };
        
        if(phone_country_code || phone_number){
            user.phone_meta = {
                country_code: phone_country_code || null,
                phone_number: phone_number || null
            };
        }

        const firestore = firebaseAdmin.firestore();

        // first confirm email
        if(email){
            if((await firestore.collection(collections.main).where('email', '==', email).get()).size > 0){
                throw new Error('The email already exist');
            }
        }


        // then check the phone
        if(phone){
            if((await firestore.collection(collections.main).where('phone', '==', user.phone).get()).size > 0){
                throw new Error('The phone already exist');
            }
            // check if the phone number is valid
            if(!(await helper.validatePhoneNumber(user.phone)).valid){
                throw new Error('Invalid phone number');
            }
        }
        
        try {
            // if Id was specified
            if(id){
                await firestore.collection(collections.main).doc(id).set(user);
                user.id = id;
            }else{
                const result = await firestore.collection(collections.main).add(user);
                user.id = result.id;
            }

            // Create user device
            const device = {
                user_id: user.id,
                device_id: device_id || null,
                device_ip:  device_ip || null,
                device_name:  device_name || null,
                notification_token:  notification_token || null,
                last_updated: helper.nowTimestamp()
            };

            if(device.device_id && device.notification_token){
                await firestore.collection(collections.main).doc(user.id)
                .collection(collections.subcollections.devices)
                .add(device);
            }
            
            return {
                ...user,
                ...(await firestore.collection(collections.main).doc(user.id).get()).data()
            }

        } catch (error) {
            throw new Error('Some thing went wrong '+error.message);
        }
    };

module.exports = createUser;