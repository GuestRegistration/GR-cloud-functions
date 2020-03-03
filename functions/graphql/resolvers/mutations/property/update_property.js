/**
 * update a property
 */

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()

const updateProperty = async (parent, {id, user_id, name, phone_country_code, phone_number, email, street, city, state, country, postal_code, rules, terms}) => {
    const property = {
        id, user_id, name, email,
        phone: {
            country_code: phone_country_code,
            phone_number: phone_number
        },
        address: {
            street, city, state, country, postal_code
        },
        terms,
        rules
    }
    const result = await firestore.collection(collections.property.main).doc(id).update(property)
    //publish the new reservation to it subscriptions
    // sub.pubsub.publish(sub.subscriptions.reservation.create, {PropertyUpdated:property})

    return property;
}

module.exports = updateProperty