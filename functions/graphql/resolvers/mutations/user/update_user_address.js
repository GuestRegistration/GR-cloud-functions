
/**
 * 
 * update user address
 */

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const updateUserAddress = async (parent, {id, street, city, state, country, postal_code}) => {
    const address = {street, city, country, state, postal_code};
    await firestore.collection(collections.user.main).doc(id).update({address})

    return address;
}

module.exports = updateUserAddress;