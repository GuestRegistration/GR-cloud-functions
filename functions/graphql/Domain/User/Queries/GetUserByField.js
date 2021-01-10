/**
 * Get user by field
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserByField = async (parent, {field, value}, context) =>  {
  clientAuthorizedMiddleware(context);
  const firestore = firebaseAdmin.firestore();

  const query =  await firestore.collection(collections.main).where(field, '==', value).get();
    const users = [];
    if(!query.empty){
      query.forEach(user => {
          let data = user.data();
          data.id = user.ref.id;
          users.push(data);
      });
      return users;
    }
    return null;
};

module.exports = getUserByField;