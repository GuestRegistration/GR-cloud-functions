const phone = {
    country_code: (parent) => parent.country_code,
    phone_number: (parent) => parent.phone_number,
    complete_phone: (parent) => (parent.country_code && parent.phone_number) ? parent.country_code+parent.phone_number : null
}

module.exports = phone