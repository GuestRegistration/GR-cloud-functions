
/**
 * 
 * update user address
 */

 //  middlewares
 const client_middleware = require('./../../../middleware/client_authorized')
 const user_middleware = require('./../../../middleware/user_authorized')

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const updateUserAddress = async (parent, {id, street, city, state, country, postal_code}, context) => {
    client_middleware(context)
    user_middleware(context, [id])

    const address = {street, city, country, state, postal_code};
    await firestore.collection(collections.user.main).doc(id).update({address})

    return address;
}

module.exports = updateUserAddress;