
/**
 * update a user device
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const helper = require('./../../../../helper')
const firestore = admin.firestore()


const updateUserDevice = async (parent, {id, device_id, device_name, device_ip}, context) => {
        client_middleware(context)
        
        const device = {
            user_id: id,
            device_id,
            device_ip,
            device_name,
            last_updated: helper.nowTimestamp()
        }
        const deviceRef = firestore.collection(collections.user.main)
                        .doc(id)
                        .collection(collections.user.meta.name)
                        .doc(collections.user.meta.documents.device)
        try {
            /**
             * First check if the device document already exist for the user. I'll remove this check in the future
             * since the document will created automatically in cloud function when the user document is created.
             */
            if((await deviceRef.get()).exists){
                await deviceRef.update(device)
                return device;
            }else{
                // this create the document and set dara
                await deviceRef.set(device)
                return device;
            }
            
        } catch (error) {
            return null
        }

    }

module.exports = updateUserDevice;