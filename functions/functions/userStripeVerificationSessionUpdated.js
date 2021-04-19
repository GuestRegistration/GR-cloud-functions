const functions = require('firebase-functions');
const collections = require('../enums/collections');

const notification = require('../helpers/notification');

module.exports = functions.firestore.document(`/${collections.user.main}/{userId}/${collections.user.subcollections.stripe_identify_verifications}/{sessionId}`)
.onUpdate((snapshot, context) => {
    const session = snapshot.after.data();
    // Send notification to user 
    if(session.status === 'verified' || session.status === 'canceled'){
      return notification.user(context.params.userId, {
        text: session.status === 'verified' ? `Your identity verification was successful` : `Your identity verification has been canceled`,
        type: `identity.verification`,
        payload: {
            verification_session_id: session.id,
          }
        })
      }  
              
    return null;
});