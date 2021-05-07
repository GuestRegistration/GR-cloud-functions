const config = require('../../../../../config');
const helper = require('../../../../../helpers');

const stripe = require('stripe')(config.stripe.secretKey);

const updateStripeCustomer = async (customer_id, { name, source, email, phone, description, metadata }, stripe_account = undefined) => {
    
  const data = {
    name, source, phone, description, metadata
  }

  if(email && helper.validateEmail(email)){
    data.email = email
  }

  const customer = await stripe.customers.update(customer_id, data,
      {
        stripeAccount: stripe_account
      }
    );
    
    return customer;
}

module.exports = updateStripeCustomer;




