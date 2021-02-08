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
    }
}
