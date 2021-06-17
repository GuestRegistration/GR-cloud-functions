const ping = (request, response) => {
    return response.status(200).json({
        ping: true,
        property: request.property.name
    });
};
module.exports = ping;