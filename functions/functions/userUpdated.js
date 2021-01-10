const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('../admin');
const helper = require('../helpers');
const collections = require('../enums/collections');

const firestore = admin.firestore();

module.exports = functions.firestore.document(`/${collections.main}/{user_id}`)
.onUpdate((snapshot, context) => {

    // const before = snapshot.before.data();
    // const after = snapshot.after.data();
    // const timestamp = before.timestamp;
    // timestamp.updated_at = helper.nowTimestamp();
    // return snapshot.after.ref.update({
    //         timestamp
    //      });

    return null;
});