/**
 * create a new property
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()
const helper = require('./../../../../helper')

 const createProperty = async (parent, {user_id, name, phone_country_code, phone_number, email, street, city, state, country, postal_code, rules, terms}) => {
    const property = {
        user_id, name, email,
        phone: {
            country_code: phone_country_code,
            phone_number: phone_number
        },
        address: {
            street: street || null,
            city: city || null,
            state: state || null,
            country : country || null,
            postal_code: postal_code || null
        },
        terms,
        rules
    }
    const result = await firestore.collection(collections.property.main).add(property)
    property.id = result.id
    //publish the new reservation to it subscriptions
    // sub.pubsub.publish(sub.subscriptions.reservation.create, {PropertyCreated:property})
    return property;
}

 module.exports = createProperty