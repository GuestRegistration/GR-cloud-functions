
/**
 * update user a new user
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


const updateUser = async (parent, {id, email, phone, first_name, last_name}, context) => {
    client_middleware(context)
    user_middleware(context, id)

        let user = {
            id,
            email,
            phone,
            name:{
                first_name,
                last_name
            }
        }
        try {
            const result = await firestore.collection(collections.user.main).doc(id).update(user)
            return user;
        } catch (error) {
            throw new Error('Something went wrong '+error.message)
        }

    }

module.exports = updateUser;