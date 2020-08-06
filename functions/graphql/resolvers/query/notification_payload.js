const payload = {
    user_id: (parent) => parent.user_id,
    identity_id: (parent) => parent.identity_id,
    property_id: (parent) => parent.property_id,
    reservation_id: (parent) => parent.reservation_id,
}
module.exports = payload