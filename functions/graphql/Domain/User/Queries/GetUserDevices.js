/**
 * Get a single user devices
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');



const getUserDevices = async (parent, { id }, context) =>  {
  clientAuthorizedMiddleware(context);
  let user_id = null;

  //if an id was specified, perhaps for admin purpose
  if(!id){
    user_id = userAuthenticatedMiddleware(context);
  }
  const devices = [];
  if(user_id){
    const firestore = firebaseAdmin.firestore();

    const query = await firestore.collection(collections.main)
                            .doc(id)
                            .collection(collections.subcollections.devices)
                            .get();
    if(!query.empty){
        query.forEach( id => {
            let device = id.data();
            device.id = id.id;
            devices.push(device);
        });
      return devices;
    }
  }

  return null;
};

module.exports = getUserDevices;
