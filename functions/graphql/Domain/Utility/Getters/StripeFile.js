const stripeFile = {
    id: (parent) => parent.id,
    object: (parent) => parent.object,
    created: (parent) => parent.created,
    expires_at: (parent) => parent.expires_at,
    filename: (parent) => parent.filename,
    links: (parent) => parent.links,
    purpose: (parent) => parent.purpose,
    size: (parent) => parent.size,
    title: (parent) => parent.title,
    type: (parent) => parent.type,
    url: (parent) => parent.url,
    img_src: (parent) => `https://dashboard.stripe.com/download/${parent.id}`
};

module.exports = stripeFile;