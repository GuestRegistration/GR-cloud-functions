
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
    const users = await firestore.collection(collections.user.main).get();
    if(users.size > 0){
        let promises = [];
        users.forEach(user => {
            const oldData = user.data();
            const newData = user.data();
            if(oldData.phone  && typeof (oldData.phone) === 'object'){
                newData.phone = `${oldData.phone.country_code}${oldData.phone.phone_number}`;
                newData.phone_meta = oldData.phone;
            }
            promises.push(user.ref.set(newData));
        })
       const updates = await Promise.all(promises);
       return `${updates.length} document touched`;
    } 
    return 'No record to normalize';
 }
 
 module.exports = normalization
 