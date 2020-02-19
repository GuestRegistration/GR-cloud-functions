/**
 * update a property
 */

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const updateProperty = async (parent, {id, user_id, name, phone, email, street, city, state, country, postal_code}) => {
    const property = {
        user_id, name, phone, email,
        address: {
            street, city, state, country, postal_code
        }
    }
    const result = await firestore.collection(collections.property).doc(id).update(property);
    return property;
}

module.exports = updateProperty