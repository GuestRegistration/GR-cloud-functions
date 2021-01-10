
/**
 * update a user device
 */

//  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const  userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const helpers = require( '../../../../helpers');

const updateUserDevice = async (parent, {user_id, device_id, device_ip, device_name, notification_token}, context) => {
    clientAuthorizedMiddleware(context);
        //if an id was specified, perhaps for admin purpose
        if(!user_id){
            user_id = userAuthenticatedMiddleware(context);
        }

        const device = {
            user_id,
            device_id: device_id || null,
            device_ip:  device_ip || null,
            device_name:  device_name || null,
            notification_token:  notification_token || null,
            last_updated: helpers.nowTimestamp()
        };

        const firestore = firebaseAdmin.firestore();

        try {
            const deviceSnapshot = await firestore.collection(collections.main).doc(user_id)
                                .collection(collections.subcollections.devices)
                                .where('device_id', '==', device_id)
                                .get();
            if(deviceSnapshot.size){
                deviceSnapshot.forEach(async snapshot => {
                    await snapshot.ref.update(device);
                });
            }else{
                await firestore.collection(collections.main).doc(user_id)
                    .collection(collections.subcollections.devices)
                    .add(device);
            }
                
            return device;
        } catch (error) {
            return null;
        }
    };

module.exports = updateUserDevice;