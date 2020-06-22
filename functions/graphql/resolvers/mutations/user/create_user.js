
/**
 * Add a new user
 */
 //  middlewares
 const client_middleware = require('./../../../middleware/client_authorized')

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()
const helper = require('./../../../../helper')


const createUser = async (parent, {id, email, phone, phone_country_code, phone_number, first_name, last_name}, context) => {
    client_middleware(context)

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
        }
        
        if(phone_country_code || phone_number){
            user.phone_meta = {
                country_code: phone_country_code || null,
                phone_number: phone_number || null
            }
        }
        // first confirm email
        if((await firestore.collection(collections.user.main).where('email', '==', email).get()).size > 0){
            throw new Error('The email already exist')
        }
        // then check the phone
        if((await firestore.collection(collections.user.main).where('phone', '==', user.phone).get()).size > 0){
            throw new Error('The phone already exist')
        }
        // check if the phone number is valid
        if(!(await helper.validatePhoneNumber(user.phone)).valid){
            throw new Error('Invalid phone number ')
        }

        try {
            // if Id was specified
            if(id){
                await firestore.collection(collections.user.main).doc(id).set(user)
                user.id = id
                return user;
            }else{
                const result = await firestore.collection(collections.user.main).add(user)
                user.id = result.id
                return user; 
            }
            
        } catch (error) {
            throw new Error('Some thing went wrong '+error.message)
        }
    }

module.exports = createUser;