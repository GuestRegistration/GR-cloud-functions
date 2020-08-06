const _ = require('lodash')
const functions = require('firebase-functions')
const admin = require('../admin')
const firestore = admin.firestore()
const collections = require('../enums/collections')
const notificationTypes = require('../enums/notifications')
const notification = require('../helper/notification')

module.exports = functions.firestore.document(`/${collections.user.main}/{user}/${collections.user.subcollections.identities}/{identity}/access_history/{history}`)
.onCreate((snapshot, context) => {
    const userDocId = context.params.user;
    const identityDocId = context.params.identity;

    const history = snapshot.data()
    return firestore.collection(collections.user.main).doc(history.user_id).get()
            .then(snapshot => {
                const accessor = snapshot.data();
                return notification.user(userDocId, {
                    text: `Your ID was recently accessed by ${accessor.name.first_name} ${accessor.name.last_name}`,
                    type: notificationTypes.identityAccess,
                    payload: {
                        user_id: snapshot.ref.id,
                        identity_id: identityDocId
                    }
                })
            })
})