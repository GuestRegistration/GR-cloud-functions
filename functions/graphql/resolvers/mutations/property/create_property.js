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

        
        // first confirm email
        const check_email = await firestore.collection(collections.property.main).where('email', '==', property.email).get()
        if(check_email.size > 0){
            throw new Error('The email already being used by another property')
        }
        // then check the phone
        const check_phone = await firestore.collection(collections.property.main).where('phone', '==', property.phone).get()
        if(check_phone.size > 0){
            throw new Error('The phone number already being used by another property')
        }
        // check if the phone number is valid
        if(!(await helper.validatePhoneNumber(`${property.phone.country_code}${property.phone.phone_number}`)).valid){
            throw new Error('Invalid phone number ')
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