module.exports = {
    identity: {
        verification_intent: [
            'identity.verification_intent.canceled',
            'identity.verification_intent.created',
            'identity.verification_intent.processing',
            'identity.verification_intent.requires_action',
            'identity.verification_intent.succeeded',
            'identity.verification_intent.updated',
        ],
        verification_session: [
            'identity.verification_session.canceled',
            'identity.verification_session.created',
            'identity.verification_session.processing',
            'identity.verification_session.requires_input',
            'identity.verification_session.updated',
            'identity.verification_session.verified',        
        ],
        verification_report: [
            'identity.verification_report.created',
            'identity.verification_report.unverified',
            'identity.verification_report.updated',
            'identity.verification_report.verified',
        ]
    },
    connect: {
        account: [
            'account.updated',
            'account.application.authorized',
            'account.application.deauthorized',
            'account.external_account.created',
            'account.external_account.deleted',
            'account.external_account.updated',

        ],
        payment_intent: [
            'payment_intent.amount_capturable_updated',
            'payment_intent.canceled',
            'payment_intent.created',
            'payment_intent.payment_failed',
            'payment_intent.processing',
            'payment_intent.requires_action',
            'payment_intent.succeeded',
        ],

        payment_method: [
            'payment_method.attached',
            'payment_method.automatically_updated',
            'payment_method.card_automatically_updated',
            'payment_method.detached',
            'payment_method.updated',
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
        ]
    }
}
