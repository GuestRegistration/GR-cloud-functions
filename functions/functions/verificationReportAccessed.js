const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require('../graphql/Domain/User/Enums/collections');

const notificationTypes = require('../enums/notifications');
const notification = require('../helpers/notification');

module.exports = functions.firestore.document(`/${collections.main}/{userId}/${collections.subcollections.stripe_identity_verifications}/{verificationId}/access_history/{history}`)
.onCreate((snapshot, context) => {
    const userId = context.params.userId;
    const verificationId = context.params.verificationId;

    const history = snapshot.data();
    const firestore = admin.firestore();

    return firestore.collection(collections.main).doc(history.user_id).get()
            .then(snapshot => {
                const accessor = snapshot.data();
                return notification.user(userId, {
                    text: `Identity verification report recently viewed by ${accessor.name.first_name} ${accessor.name.last_name}`,
                    type: notificationTypes.idVerificationAccess,
                    payload: {
                        user_id: snapshot.ref.id,
                        verification_id: verificationId
                    }
                });
            });
});