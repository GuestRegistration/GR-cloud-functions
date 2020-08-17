
/**
 * delete a property notification
 * 
 * */ 
 //  middlewares
 const client_middleware = require('../../../middleware/client_authorized')

const admin = require('../../../../admin')
const firestore = admin.firestore()
const collections = require('../../../../enums/collections')
const user_middleware = require('../../../middleware/user_authorized')


const deletePropertyNotification = async (parent, {property_id, id}, context) => {
    client_middleware(context);

    const propertyRef = firestore.collection(collections.property.main).doc(property_id);
    const property = await propertyRef.get();

    if(property.exists){
        user_middleware(context, [property.data().user_id]);

        const notification = await firestore.collection(collections.property.main).doc(property_id)
                            .collection(collections.property.subcollections.notifications)
                            .doc(id).delete();
        
        if(notification.writeTime) return true;
        return false;

    }else{
        throw new Error('Property does not exist')
    }

}

module.exports = deletePropertyNotification;