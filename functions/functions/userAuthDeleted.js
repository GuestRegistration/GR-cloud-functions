const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require ('../graphql/Domain/User/Enums/collections');

module.exports = functions.auth.user().onDelete((user) => {
    const firestore = admin.firestore();
    const docRef = firestore.collection(collections.main).doc(user.uid);
    return docRef.get()
        .then(snapshot => {
            if(snapshot.exists){
                return firestore.collection(collections.trash).doc(snapshot.ref.id).set(snapshot.data());
            }
            return Promise.resolve();
        })
        .then(() => docRef.delete());
  });
