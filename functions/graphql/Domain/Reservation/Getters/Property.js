
const property = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    city: (parent) => parent.city,
    country: (parent) => parent.country,
    image: (parent) => parent.image ? parent.image : 'https://res.cloudinary.com/adedayomatt/image/upload/v1607575119/Virtual%20Tribe/1602792209093.jpg',
};

module.exports = property;