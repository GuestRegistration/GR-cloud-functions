/**
 * Get user verification
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const stripeVerificationReport = require('../../Services/Identity/Actions/GetStripeVerificationReport');
const helpers = require( '../../../../helpers');

const getUserStripeVerificationReport = async (parent, { user_id, verification_id }, context) =>  {
  clientAuthorizedMiddleware(context);

    let report = null;
    const auth = userAuthenticatedMiddleware(context);

    if(!user_id){
        user_id = auth;
    }

    const firestore = firebaseAdmin.firestore();

    const verificationRef = firestore.collection(collections.main).doc(user_id)
                        .collection(collections.subcollections.stripe_identity_verifications)
                        .doc(verification_id);
                    
  const verificationDoc = await verificationRef.get();

    if(verificationDoc.exists){
        const verification = verificationDoc.data();
        if(verification.report){
            report = await stripeVerificationReport({id: verification.report});
        }

        if(report && user_id !== auth){
            // update the access history
            await verificationRef.collection('access_history').add({
                user_id: auth,
                client: context.auth.client_token,
                accessed_at: helpers.nowTimestamp()
            })
        }
    }

    return report;
};

module.exports = getUserStripeVerificationReport;