const functions = require('firebase-functions');
const admin = require('../admin');
const collections = require('../enums/collections');
const config = require('../config');
const Stripe = require('stripe');
const stripe = Stripe(config.stripe.test.secretKey, {
  apiVersion: '2020-08-27; identity_beta=v4'
});

const notification = require('../helpers/notification');

const firestore = admin.firestore();

module.exports = functions.firestore.document(`/${collections.user.main}/{userId}/${collections.user.meta.name}/${collections.user.meta.documents.verification_session}`)
.onUpdate((snapshot, context) => {
    const session = snapshot.after.data();
    const userRef = firestore.collection(collections.user.main).doc(context.params.userId);

    // retrieve verification report
    if(session.last_verification_report){
        // Request for the last report and save it in the user document
        const resource = Stripe.Stripe.StripeResource.extend({
            request: Stripe.Stripe.StripeResource.method({
              method: 'GET',
              path: `/identity/verification_reports/${session.last_verification_report}`,
            })
          });

          let report = {};
          let files = [];

          return new resource(stripe).request({
            expand: [],
          })
          .then(response => {
            report = response;

            files = [{
              name: 'document_front',
              id: response.document.front
            },
            {
              name: 'document_back',
              id: response.document.back
            },
            {
              name: 'selfie',
              id: response.selfie.selfie
            }];

            return Promise.all(files.map(file => file.id ? stripe.files.retrieve(file.id) : Promise.resolve(null)))
          })
          // Append files to the report
          .then(retrivedFiles => {
            
            const firestoreFiles = {};
            retrivedFiles.forEach((file, i) => {
              firestoreFiles[files[i].name] = file
            })

            return userRef.collection(collections.user.meta.name)
              .doc(collections.user.meta.documents.verification_report)
              .set({
                ...report,
                files: firestoreFiles
              });
          })
          //Update user document
          .then(() => {
            return userRef.update({
              'verification.document': report.document.status,
              'verification.selfie': report.selfie.status
            })
          })
          // Send notification to user 
          .then(() => {
            if(session.status === 'verified' || session.status === 'canceled'){
              return notification.user(context.params.userId, {
                text: `Your identity verification has been ${session.status}`,
                type: `identity.verification`,
                payload: {
                    verification_session_id: session.id,
                  }
                })
              }
  
              return Promise.resolve();
          })
          
    }
    return null;
});