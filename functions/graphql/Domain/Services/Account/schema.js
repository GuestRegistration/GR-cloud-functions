const { gql } =  require('apollo-server-express');

const schema = gql`
    type StripeAccount {
        id: ID
        object: String
        business_profile: StripeAccountBusinessProfile
        capabilities: StripeAccountCapabilities
        charges_enabled: Boolean
        country: String
        default_currency: String
        details_submitted: Boolean
        email: String
        payouts_enabled: Boolean
        settings: StripeAccountSettings
        type: String
    }

    type StripeAccountBusinessProfile {
        mcc: String
        name: String
        product_description: String
        support_address: StripeAddress
        support_email: String
        support_phone: String
        support_url: String
        url: String
    }

    type StripeAccountCapabilities {
        card_payments: String,
        transfers: String
    }

    type StripeAccountSettings {
        branding: StripeAccountSettingsBranding
    }

    type StripeAccountSettingsBranding {
        icon: String
        logo: String
        primary_color: String
        secondary_color: String
    }
`;

module.exports = schema;
