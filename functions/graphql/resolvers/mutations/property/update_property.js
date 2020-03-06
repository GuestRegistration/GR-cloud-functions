/**
 * update a property
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()

const updateProperty = async (parent, {id, user_id, name, phone_country_code, phone_number, email, street, city, state, country, postal_code, rules, terms}, context) => {
    client_middleware(context)
    const propertyRef = firestore.collection(collections.property.main).doc(id)
    const property = await propertyRef.get()
    if(property.exists){
        user_middleware(context, property.data().user_id)
        const updated_property = {
            id, user_id, name, email,
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
        const result = await propertyRef.update(updated_property)

        //publish the new reservation to it subscriptions
        // sub.pubsub.publish(sub.subscriptions.reservation.create, {PropertyUpdated:property})
    
        return (await propertyRef.get()).data();
    }else{
        throw new Error('Property does not exist')
    }

}

module.exports = updateProperty