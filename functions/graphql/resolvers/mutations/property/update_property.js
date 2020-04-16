/**
 * update a property
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const helper = require('./../../../../helper')
const firestore = admin.firestore()

const updateProperty = async (parent, {id, name, phone_country_code, phone_number, email, street, city, state, country, postal_code, rules, terms}, context) => {
    client_middleware(context)

    const propertyRef = firestore.collection(collections.property.main).doc(id)
    const property = await propertyRef.get()

    if(property.exists){
        user_middleware(context, [property.data().user_id])
        const timestamp = property.timestamp
        timestamp.updated_at = helper.nowTimestamp()

        const updated_property = {
            name, 
            email,
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
            rules,
            timestamp
        }


        // first confirm email
        const check_email = await firestore.collection(collections.property.main).where('email', '==', updated_property.email).get()
        if(check_email.size > 0){
            check_email.forEach(property => {
                if(property.ref.id !== id){
                    throw new Error('The email already being used by another property')
                }
            })
        }
        // then check the phone
        const check_phone = await firestore.collection(collections.property.main).where('phone', '==', updated_property.phone).get()
        if(check_phone.size > 0){
            check_phone.forEach(property => {
                if(property.ref.id !== id){
                    throw new Error('The phone number already being used by another property')
                }
            })
        }

        // check if the phone number is valid
        if(!(await helper.validatePhoneNumber(`${updated_property.phone.country_code}${updated_property.phone.phone_number}`)).valid){
            throw new Error('Invalid phone number ')
        }
        
        try {
            const result = await propertyRef.update(updated_property)
            //publish the new reservation to it subscriptions
            // sub.pubsub.publish(sub.subscriptions.reservation.create, {PropertyUpdated:property})
            const  update = await propertyRef.get()

            const newly_updated_property = update.data()
            newly_updated_property.id = update.ref.id
            return newly_updated_property

        } catch (error) {
            throw new Error('Something went wrong '+error.message)
        }
        
    }else{
        throw new Error('Property does not exist')
    }

}

module.exports = updateProperty