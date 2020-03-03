/**
 * create a new property
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()


 const createProperty = async (parent, {user_id, name, phone_country_code, phone_number, email, street, city, state, country, postal_code}) => {
    const property = {
        user_id, name, email,
        phone: {
            country_code: phone_country_code,
            phone_number: phone_number
        },
        address: {
            street, city, state, country, postal_code
        }
    }
    const result = await firestore.collection(collections.property.main).add(property)
    property.id = result.id
    //publish the new reservation to it subscriptions
    // sub.pubsub.publish(sub.subscriptions.reservation.create, {PropertyCreated:property})
    return property;
}

 module.exports = createProperty