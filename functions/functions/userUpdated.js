const _ = require('lodash');
const functions = require('firebase-functions');
const helper = require('../helpers');
const collections = require('../enums/collections');

module.exports = functions.firestore.document(`/${collections.main}/{userId}`)
.onUpdate((snapshot, context) => {
    // return snapshot.after.ref.update({
    //     'timestamp.updated_at': helper.nowTimestamp()
    // });
    return Promise.resolve();
});