
/**
 * update user a new user
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const helper = require('./../../../../helper')

const firestore = admin.firestore()


const updateUser = async (parent, {id, email, phone, phone_country_code, phone_number, first_name, last_name}, context) => {
    client_middleware(context)
    // user_middleware(context, [id])
    const userRef = firestore.collection(collections.user.main).doc(id)
    const user = await userRef.get()

        let updated_user = {
            id,
            email,
            phone,
            name:{
                first_name,
                last_name
            }
        }

        if(phone_country_code || phone_number){
            updated_user.phone_meta = {
                country_code: phone_country_code || null,
                phone_number: phone_number || null
            }
        }
        // first confirm email
        const user_check_email = await firestore.collection(collections.user.main).where('email', '==', updated_user.email).get()
        if(user_check_email.size > 0){
            user_check_email.forEach(user => {
                if(user.ref.id !== id){
                    throw new Error('The email already being used by someone else')
                }
            })
        }

        // then check the phone
        const user_check_phone = await firestore.collection(collections.user.main).where('phone', '==', updated_user.phone).get()
        if(user_check_phone.size > 0){
            user_check_phone.forEach(user => {
                if(user.ref.id !== id){
                    throw new Error('The phone number already being used by someone else')
                }
            })
        }

        // check if the phone number is valid
        if(!(await helper.validatePhoneNumber(updated_user.phone)).valid){
            throw new Error('Invalid phone number ')
        }

        try {
            const userData = user.data()
            const timestamp = userData.timestamp
            timestamp.updated_at = helper.nowTimestamp()
        
            await firestore.collection(collections.user.main).doc(id).update(updated_user);

            return updated_user;
        } catch (error) {
            throw new Error('Something went wrong '+error.message)
        }
    }

module.exports = updateUser;