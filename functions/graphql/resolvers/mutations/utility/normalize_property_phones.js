
/**
 * Stabilize all phone numbers
 */

 //  middlewares
 const client_middleware = require('../../../middleware/client_authorized')

 const collections = require('../../../../enums/collections')
 const admin = require('../../../../admin')
 const firestore = admin.firestore()
 
 const normalization = async (parent, args, context) => {
     client_middleware(context)
    const properties = await firestore.collection(collections.property.main).get();
    if(properties.size > 0){
        let promises = [];
        properties.forEach(property => {
            const oldData = property.data();
            const newData = property.data();
            console.log(oldData, newData);
            if(oldData.phone && typeof (oldData.phone) === 'object'){
                newData.phone = `${oldData.phone.country_code}${oldData.phone.phone_number}`;
                newData.phone_meta = {
                    country_code: oldData.phone.country_code,
                    phone_number: oldData.phone.phone_number
                }
            }
            promises.push(property.ref.update(newData));
        })
       const updates = await Promise.all(promises);
       return `${updates.length} document touched`;
    } 
    return 'No record to normalize';
 }
 
 module.exports = normalization
 