const config = require('../../config');
const Stripe = require('stripe');
const stripe = Stripe(config.stripe.test.secretKey);

module.exports = async (request, response) => {
    const signature = request.headers['stripe-signature'];
    let event = request.body
    try {
      event = stripe.webhooks.constructEvent(request.rawBody , signature, config.stripe.webhooks.connect.secret);
    }
    catch (err) {
      console.log('Could not verify signature.', err.message)
     return response.status(400).json({received: false});
    }

    const firebaseAdmin = require('../../admin');
    const firestore = firebaseAdmin.firestore();
    const collections = require('../../enums/collections');

    // General logging of events received from Stripe
    await firestore.collection(collections.system.stripe_connect_events).doc(event.id).set(event);

    return response.status(200).json({received: true});
}