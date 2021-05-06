const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const getStripePlan = async ( price_id ) => {
    
  const plan = await stripe.plans.retrieve( price_id,
      {
        expand: ['product']
      }
    );
      return plan;
}

module.exports = getStripePlan;




