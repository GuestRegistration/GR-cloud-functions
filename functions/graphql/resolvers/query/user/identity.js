const identity = {
    user_id: (parent) => parent.user_id,
    country: (parent) => parent.country,
    document_type: (parent) => parent.document_type,
    document_url: (parent) => parent.document_url,
    title: (parent) => parent.title,
    verified: (parent) => parent.verified_at === null || typeof parent.verified_at === "undefined" ? false : true,
    verified_at: (parent) => parent.verified_at,
    ref: (parent) => parent.ref
}

module.exports = identity