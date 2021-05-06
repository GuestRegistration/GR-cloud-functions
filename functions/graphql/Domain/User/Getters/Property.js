const property =  {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    address: (parent) => parent.address,
    role: (parent) => parent.role,
    image: (parent) => parent.image,
    subscription_status: (parent) => parent.subscription_status,
    active: (parent) => parent.subscription_status === 'active' || parent.subscription_status === 'trialing',
};

module.exports = property;