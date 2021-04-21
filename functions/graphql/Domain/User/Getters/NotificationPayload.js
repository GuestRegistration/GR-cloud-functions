const payload = {
    user_id: (parent) => parent.user_id,
    property_id: (parent) => parent.property_id,
    reservation_id: (parent) => parent.reservation_id,
    verification_id: (parent) => parent.verification_id,
};

module.exports = payload;