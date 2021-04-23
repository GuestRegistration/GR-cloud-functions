const createStripeRefund = require('../Actions/CreateStripeRefund');

const createRefund = async (parent, { stripe_account, charge_id, amount, reason, customer_note }, context) => {
    
      return await createStripeRefund({ stripe_account, charge_id, amount, reason, customer_note });
}

module.exports = createRefund;




