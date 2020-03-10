const identity_lite = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    country: (parent) => parent.country,
    document_type: (parent) => parent.document_type,
    title: (parent) => parent.title,
    verified: (parent) => parent.verified_at === null || typeof parent.verified_at === "undefined" ? false : true,
    ref: (parent) => parent.ref
}

module.exports = identity_lite