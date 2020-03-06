
/**
 * soft delete a user account
 * 
 * */ 
 //  middlewares
 const client_middleware = require('./../../../middleware/client_authorized')

const admin = require('./../../../../admin')
const firestore = admin.firestore()
const helper = require('./../../../../helper')
const collections = require('../../../../enums/collections')

const deleteUser = async (parent, {id}, context) => {
    client_middleware(context)
    
    const userRef = firestore.collection(collections.user.main).doc(id)
    const userDevicesRef = firestore.collection(collections.user.main).doc(id).collection(collections.user.subcollections.device);
    const userPaymentsRef = firestore.collection(collections.user.main).doc(id).collection(collections.user.subcollections.payment);
    const userVerificationRef = firestore.collection(collections.user.main).doc(id).collection(collections.user.subcollections.verification);

    const trashRef = firestore.collection(collections.user.trash).doc(id)

    // get the document first
    const user = await firestore.collection(collections.user.main).doc(id).get()
    if(user.exists){
        const user_trash = user.data();
        user_trash.timestamp.deleted_at = helper.nowTimestamp();
        await trashRef.set(user_trash)
        const trashed = await trashRef.get()

        // confirm if the main document has been moved to the trash before moving its subcollections and deleting the document
        if(trashed.exists){
            const devices = await userDevicesRef.get()
            const payments = await userPaymentsRef.get();
            const id_verification = await userVerificationRef.get();

            if(devices.size > 0){
                    //    move user devices to the trash as well
                    devices.forEach(async (device_snapshot) => {
                       await trashRef.collection(collections.user.subcollections.device).add(device_snapshot.data())
                       await device_snapshot.ref.delete();
                })
            }

            if(payments.size > 0){
                //    move user devices to the trash as well
                payments.forEach(async (payment_snapshot) => {
                       await trashRef.collection(collections.user.subcollections.payment).add(payment_snapshot.data())
                       await payment_snapshot.ref.delete();
                   })
            }
          
            if(id_verification.size > 0){
                 //    move user devices to the trash as well
                id_verification.forEach(async (verification_snapshot) => {
                       await trashRef.collection(collections.user.subcollections.verification).add(verification_snapshot.data())
                       await verification_snapshot.ref.delete();
                   })
            }

            //finally delete the user main document
            await userRef.delete()

            return user_trash;
        }
    }
    return null
}

module.exports = deleteUser;