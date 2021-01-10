const user = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    email: (parent) => parent.email,
    phone: (parent) => parent.phone,
    phone_meta: (parent) => parent.phone_meta,
    phone_verified: (parent) => typeof parent.phone_verified_at === "undefined" ? false : true,
    phone_verified_at: (parent) => parent.phone_verified_at,
    address: (parent) => parent.address,
    country_of_residence: (parent) => parent.country_of_residence,
    profile_image: (parent) => parent.profile_image,
    id_verified: (parent) => true,  //return true for now, I'll later check from the id_verification_data map
    reservations: (parent) => parent.reservations,
    properties: (parent) => parent.properties
};

module.exports = user;