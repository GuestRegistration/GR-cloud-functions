/**
 * update a property rules
 */

 //  middlewares
 const client_middleware = require('./../../../middleware/client_authorized')
 const user_middleware = require('./../../../middleware/user_authorized')
 
 const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const helper = require('./../../../../helper')
const firestore = admin.firestore()

 const updatePropertyRules = async (parent, {id, rules}, context) => {
    client_middleware(context)
    const propertyRef = firestore.collection(collections.property.main).doc(id)
    const property = await propertyRef.get()
    if(property.exists){
        user_middleware(context, [property.data().user_id])
                        
        const updated = await propertyRef.update({
                                    rules: rules
                                })
        return (await propertyRef.get()).data();
    } else{
        throw new Error('Property does not exist')
    } 
   
}

 module.exports = updatePropertyRules

