
/**
 * update a user device
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const auth_middleware = require('./../../../middleware/user_authenticated')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const helper = require('./../../../../helper')
const firestore = admin.firestore()


const updateUserDevice = async (parent, {user_id, device_id, device_ip, device_name, notification_token}, context) => {
        client_middleware(context);
        //if an id was specified, perhaps for admin purpose
        if(!user_id){
            user_id = auth_middleware(context)
        }

        const device = {
            user_id,
            device_id: device_id || null,
            device_ip:  device_ip || null,
            device_name:  device_name || null,
            notification_token:  notification_token || null,
            last_updated: helper.nowTimestamp()
        }
        try {
            const deviceSnapshot = await firestore.collection(collections.user.main).doc(user_id)
                                .collection(collections.user.subcollections.devices)
                                .where('device_id', '==', device_id)
                                .get();
            if(deviceSnapshot.size){
                deviceSnapshot.forEach(async snapshot => {
                    await snapshot.ref.update(device);
                });
            }else{
                await firestore.collection(collections.user.main).doc(user_id)
                    .collection(collections.user.subcollections.devices)
                    .add(device);
            }
                
            return device;
        } catch (error) {
            console.log(error.message);
            return null
        }

    }

module.exports = updateUserDevice;