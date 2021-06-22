const { nanoid } = require('nanoid');
const firebaseAdmin = require('../admin');

const helpers = {
    /**
   * Generate a unique nano ID within a collection
   * @param {*} collection 
   * @param {*} size 
   * @returns 
   */
   generateNanoID: async (collection, size = 8) => {
    const id = nanoid(size);
    const firestore = firebaseAdmin.firestore();
    if((await firestore.collection(collection).doc(id).get()).exists) return helpers.generateNanoID();
    
    return id;
  }
}

module.exports = helpers;