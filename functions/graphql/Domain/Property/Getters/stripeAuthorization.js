const getStripeAccount = require('../../Services/Account/Actions/GetStripeAccount');

const authorization = {
    account: async (parent) =>{
        const { stripe_user_id } = parent;
        if(stripe_user_id) return await getStripeAccount(stripe_user_id);
        return null;
    },
};

module.exports = authorization;