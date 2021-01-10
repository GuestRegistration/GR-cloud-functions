
/**
 * soft delete a user account
 * 
 * */ 
 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 const helpers = require( '../../../../helpers');

const deleteUser = async (parent, {id}, context) => {
    clientAuthorizedMiddleware(context);

    const firestore = firebaseAdmin.firestore();
    
    const userRef = firestore.collection(collections.main).doc(id);
    const userDevicesRef = firestore.collection(collections.main).doc(id).collection(collections.subcollections.device);
    const userVerificationRef = firestore.collection(collections.main).doc(id).collection(collections.subcollections.verification);

    const trashRef = firestore.collection(collections.trash).doc(id);

    // get the document first
    const user = await firestore.collection(collections.main).doc(id).get();
    if(user.exists){
        const user_trash = user.data();
        user_trash.timestamp.deleted_at = helpers.nowTimestamp();
        await trashRef.set(user_trash);
        const trashed = await trashRef.get();

        // confirm if the main document has been moved to the trash before moving its subcollections and deleting the document
        if(trashed.exists){
            const devices = await userDevicesRef.get();
            const id_verification = await userVerificationRef.get();

            if(devices.size > 0){
                    //    move user devices to the trash as well
                    devices.forEach(async (device_snapshot) => {
                       await trashRef.collection(collections.subcollections.device).add(device_snapshot.data());
                       await device_snapshot.ref.delete();
                });
            }
          
            if(id_verification.size > 0){
                 //    move user devices to the trash as well
                id_verification.forEach(async (verification_snapshot) => {
                       await trashRef.collection(collections.subcollections.verification).add(verification_snapshot.data());
                       await verification_snapshot.ref.delete();
                   });
            }

            //finally delete the user main document
            await userRef.delete();

            return user_trash;
        }
    }
    return null;
};

module.exports = deleteUser;