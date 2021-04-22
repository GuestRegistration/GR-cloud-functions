
/**
 * Enumearation of notification types used by the application
 * 
 */

const notifications = {
    reservationCreate: 'reservation.create',
    reservationUpdate: 'reservation.update',
    reservationCheckin: 'reservation.checkin',
    reservationCheckinApproval: 'reservation.checkin.approval',
    idVerificationAccess: 'identity.verification.access',
    chargeAuthorized: 'charge.authorized',
    chargeCaptured: 'charge.captured',
};

module.exports = notifications;