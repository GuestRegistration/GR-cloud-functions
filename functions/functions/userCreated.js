const _ = require('lodash');
const functions = require('firebase-functions');
const helper = require('../helpers');
const collections = require('../graphql/Domain/User/Enums/collections');


module.exports = functions.firestore.document(`/${collections.main}/{user_id}`)
.onCreate((snapshot, context) => {

    return snapshot.ref.update({
            id: snapshot.id,
            timestamp: {
                created_at: helper.nowTimestamp(), 
                updated_at: null,
                deleted_at: null
            }
        })

 });