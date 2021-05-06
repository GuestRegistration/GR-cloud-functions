module.exports = {
    identity: [
        'identity.verification_session.canceled',
        'identity.verification_session.created',
        'identity.verification_session.processing',
        'identity.verification_session.requires_input',
        'identity.verification_session.updated',
        'identity.verification_session.verified',        
    ],

    connect: [
        'account.updated',
        'account.application.authorized',
        'account.application.deauthorized',
        'account.external_account.created',
        'account.external_account.deleted',
        'account.external_account.updated',
    ],

    charge: [
        'charge.captured',
        'charge.expired',
        'charge.failed',
        'charge.pending',
        'charge.refunded',
        'charge.succeeded',
        'charge.updated',
        'charge.dispute.closed',
        'charge.dispute.created',
        'charge.dispute.funds_reinstated',
        'charge.dispute.funds_withdrawn',
        'charge.dispute.updated',
        'charge.refund.updated'
    ],

    customer: [
        'customer.updated',
        'customer.deleted',
        'customer.created',
    ],

    customer_source: [
        'customer.source.updated',
        'customer.source.expiring',
        'customer.source.deleted',
        'customer.source.created',
    ],

    customer_subscription: [
        'customer.subscription.created',
        'customer.subscription.deleted',
        'customer.subscription.pending_update_applied',
        'customer.subscription.pending_update_expired',
        'customer.subscription.trial_will_end',
        'customer.subscription.updated'
    ]

}
