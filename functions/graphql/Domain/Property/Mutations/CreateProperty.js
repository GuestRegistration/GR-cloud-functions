/**
 * create a new property
 */

//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const subscriptions = require('../Enums/subscriptions');
const firebaseAdmin = require('../../../../admin');
const helper = require('../../../../helpers');
const sub = require('../../../App/Providers/pubsub');


 const createProperty = async (parent, {name, email, phone, phone_country_code, phone_number, full_address, street, city, state, country, postal_code, rules, terms}, context) => {
    clientAuthorizedMiddleware(context);
    const auth = userAuthenticatedMiddleware(context);

    if(auth){
        const property = {
            user_id: auth, 
            name, email, phone, full_address,
            phone_meta: {
                country_code: phone_country_code,
                phone_number: phone_number,
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
        };

        const firestore = firebaseAdmin.firestore();
        
        // first confirm email
        if(property.email){
            const check_email = await firestore.collection(collections.main).where('email', '==', property.email).get();
            if(check_email.size > 0){
                throw new Error('The email already being used by another property');
            }
        }
        // then check the phone
        if(property.phone){
            const check_phone = await firestore.collection(collections.main).where('phone', '==', property.phone).get();
            if(check_phone.size > 0){
                throw new Error('The phone number already being used by another property');
            }
            // check if the phone number is valid
            if(!(await helper.validatePhoneNumber(property.phone)).valid){
                throw new Error('Invalid phone number ');
            }
        }
        

        const result = await firestore.collection(collections.main).add(property);
        property.id = result.id;
        // publish the new property to it subscriptions
        sub.publish(subscriptions.create, {PropertyCreated:property});

        return property;
    }
    return null;
   
};

 module.exports = createProperty;