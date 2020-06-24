const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const helper = require('../helper')
const collections = require('../enums/collections')

module.exports = functions.auth.user().onDelete((user) => {
    const docRef = firestore.collection(collections.user.main).doc(user.uid)
   return docRef.get()
        .then(snapshot => {
            if(snapshot.exists){
                return firestore.collection(collections.user.trash).doc(snapshot.ref.id).set(snapshot.data())
            }else{
                return new Promise((r, e)=> {
                    r(false)
                })
            }
        })
        .then(() => docRef.delete())
  });
