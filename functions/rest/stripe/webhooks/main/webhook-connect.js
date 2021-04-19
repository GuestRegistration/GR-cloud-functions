const config = require('../../../../config');
const Stripe = require('stripe');
const stripe = Stripe(config.stripe.secretKey);

module.exports = async (request, response) => {
    const signature = request.headers['stripe-signature'];
    let event = request.body
    try {
      event = stripe.webhooks.constructEvent(request.rawBody , signature, config.stripe.webhooks.main.connect.secret);
    }
    catch (err) {
      console.log('Could not verify signature.', err.message)
      return response.status(400).json({received: false});
    }

    /**
     * We deal with connect from the main Stripe account here. For now, nothing to do
     */


    return response.status(200).json({received: true});
}