const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const helper = require('../helper')
const collections = require('../enums/collections')


module.exports = functions.firestore.document(`/${collections.user.main}/{user_id}`)
.onCreate((snapshot, context) => {

    return snapshot.ref.update({
            id: snapshot.id,
            timestamp: {
                created_at: helper.nowTimestamp(), 
                updated_at: null,
                deleted_at: null
            }
        })
        .then((update_result) => {
            // initialize the user verification document
            return snapshot.ref.collection(collections.user.meta.name)
                .doc(collections.user.meta.documents.verification)
                .set({
                    user_id: snapshot.ref.id,
                })
        })
        .then((payment_document_result) => {
            // initialize the user device document
            return snapshot.ref.collection(collections.user.meta.name)
                .doc(collections.user.meta.documents.device)
                .set({
                    user_id: snapshot.ref.id,
                    device_id: null,
                    device_name: null,
                    device_ip: null,
                    last_updated: null
                })
        })
        .then((device_document_result) => {
            // add an initial payment method document.
            return snapshot.ref.collection(collections.user.subcollections.payments)
            .add({
                user_id: snapshot.ref.id
            }) 
        })
 })