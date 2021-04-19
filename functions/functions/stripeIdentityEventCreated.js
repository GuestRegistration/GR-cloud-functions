const functions = require('firebase-functions');
const collections = require('../enums/collections');
const events = require('../rest/stripe/events');
const admin = require('../admin');

module.exports = functions.firestore.document(`/${collections.system.stripe_identity_events}/{event_id}`)
.onCreate((snapshot, context) => {
    const event = snapshot.data();
    const firestore = admin.firestore();
    const metadata = event.data.object.metadata;

    userId =  metadata.user_id;

    if(userId){
        const userRef = firestore.collection(collections.user.main).doc(userId);

        return userRef.get()
        .then(snapshot => {
            if(snapshot.exists){
                // General logging of event for user
                return userRef.collection(collections.user.subcollections.stripe_identity_events).doc(event.id).set(event)
            }
            return Promise.resolve()
        })
        .then(() => {
            // Write to verification session document
            if(events.identity.verification_session.includes(event.type)){
                const session = event.data.object; 

                const verificationRef = userRef.collection(collections.user.subcollections.stripe_identity_verifications)
                                        .doc(session.id);
                if(event.type !== 'identity.verification_session.canceled'){
                    return verificationRef.set({
                        property_id: session.metadata.property_id,
                        session: session.id,
                        report: session.last_verification_report,
                        status: session.status,
                        url: session.url,
                        type: session.type,
                        metadata: metadata
                    });
                }
                return verificationRef.delete()
            }
            return Promise.resolve()
        })
    }

    return null
 });