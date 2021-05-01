const config = require('../../../../../config');

const Stripe = require('stripe');

const createStripeVerificationSession = async ({ metadata, return_url, refresh_url }, stripe_account = undefined ) => {
    const stripe = Stripe(config.stripe.secretKey, {
        apiVersion: '2020-08-27; identity_beta=v4',
    });


    const resource = Stripe.Stripe.StripeResource.extend({
        request: Stripe.Stripe.StripeResource.method({
            method: 'POST',
            path: '/identity/verification_sessions',
        })
    })

    const verificationSession = await new resource(stripe).request({
            type: 'document',
            options: {
                document: {
                 require_matching_selfie: true,
                },
            },
            metadata: metadata,
            return_url: return_url ? return_url : 'https://guestregistrationweb.web.app/account',
            refresh_url: refresh_url ? refresh_url : 'https://guestregistrationweb.web.app/account', 
        }
        // ,
        // {
        //     stripeAccount: stripe_account
        // }
    );

    return verificationSession;
}

module.exports = createStripeVerificationSession;