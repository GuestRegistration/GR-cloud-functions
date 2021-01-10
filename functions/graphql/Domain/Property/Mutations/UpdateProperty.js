/**
 * update a property
 */

//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const subscriptions = require('../Enums/subscriptions');
const firebaseAdmin = require('../../../../admin');
const helper = require('../../../../helpers');
const sub = require('../../../App/Providers/pubsub');

const updateProperty = async (parent, {id, name, email, phone, phone_country_code, phone_number,  street, city, state, country, postal_code, rules, terms}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const propertyRef = firestore.collection(collections.main).doc(id);
    const property = await propertyRef.get();

    if(property.exists){
        userAuthenticatedMiddleware(context, [property.data().user_id]);
        const propertyData = property.data();
        const timestamp = propertyData.timestamp;
        timestamp.updated_at = helper.nowTimestamp();

        const updated_property = {
            name, 
            email,
            phone,
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
        };

        if(phone_country_code || phone_number){
            updated_property.phone_meta = {
                country_code: phone_country_code || null,
                phone_number: phone_number || null
            };
        }

        // first confirm email
        if(updated_property.email){
            const check_email = await firestore.collection(collections.main).where('email', '==', updated_property.email).get();
            if(check_email.size > 0){
                check_email.forEach(property => {
                    if(property.ref.id !== id){
                        throw new Error('The email already being used by another property');
                    }
                });
            }
        }

        // then check the phone
        if(updated_property.phone){
            const check_phone = await firestore.collection(collections.main).where('phone', '==', updated_property.phone).get();
            if(check_phone.size > 0){
                check_phone.forEach(property => {
                    if(property.ref.id !== id){
                        throw new Error('The phone number already being used by another property');
                    }
                });
            }
    
            // check if the phone number is valid
            if(!(await helper.validatePhoneNumber(updated_property.phone)).valid){
                throw new Error('Invalid phone number');
            }
        }
        
        try {
            const result = await propertyRef.update(updated_property);
            //publish the new reservation to it subscriptions
            sub.publish(subscriptions.update, {PropertyUpdated:property});

            return (await propertyRef.get()).data();

        } catch (error) {
            throw new Error('Something went wrong '+error.message);
        }
        
    }else{
        throw new Error('Property does not exist');
    }

};

module.exports = updateProperty;