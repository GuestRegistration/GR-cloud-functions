
/**
 * delete a property notification
 * 
 * */ 
 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 

const deletePropertyNotification = async (parent, {property_id, id}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();

    if(property.exists){
        userAuthorizedMiddleware(context, [property.data().user_id]);

        const notification = await firestore.collection(collections.main).doc(property_id)
                            .collection(collections.subcollections.notifications)
                            .doc(id).delete();
        
        if(notification.writeTime) return true;
        return false;

    }else{
        throw new Error('Property does not exist');
    }

};

module.exports = deletePropertyNotification;