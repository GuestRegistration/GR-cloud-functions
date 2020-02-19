
/**
 * update user a new user
 */

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


const updateUser = async (parent, {id, email, phone, first_name, last_name}) => {
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
            const result = await firestore.collection(collections.user).doc(id).update(user)
            return user;
        } catch (error) {
            return error.message
        }

    }

module.exports = updateUser;