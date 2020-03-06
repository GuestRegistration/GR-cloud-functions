/**
 * create a new property
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const auth_middleware = require('./../../../middleware/user_authenticated')
const user_middleware = require('./../../../middleware/user_authorized')


const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()
const helper = require('./../../../../helper')

 const createProperty = async (parent, {name, phone_country_code, phone_number, email, street, city, state, country, postal_code, rules, terms}, context) => {
    client_middleware(context)
    const auth = auth_middleware(context)
    if(auth){
        const property = {
            user_id: auth, 
            name, email,
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
    return null
   
}

 module.exports = createProperty