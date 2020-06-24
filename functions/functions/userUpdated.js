const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const helper = require('../helper')
const collections = require('../enums/collections')

module.exports = functions.firestore.document(`/${collections.user.main}/{user_id}`)
.onUpdate((snapshot, context) => {

    // const before = snapshot.before.data();
    // const after = snapshot.after.data();
    // const timestamp = before.timestamp;
    // timestamp.updated_at = helper.nowTimestamp();
    // return snapshot.after.ref.update({
    //         timestamp
    //      });

    return null;
})