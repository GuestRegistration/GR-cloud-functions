
/**
 * Add a new user
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


const createUser = async (parent, {email, phone, first_name, last_name}) => {
        let user = {
            email,
            phone,
            name:{
                first_name,
                last_name
            }
        }
        try {
            const result = await firestore.collection(collections.user.main).add(user)
            user.id = result.id
            return user;
        } catch (error) {
            return error.message
        }

    }

module.exports = createUser;