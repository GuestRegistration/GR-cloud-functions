const {  getCharges } = require('../helper/fields')

const charges = async (req, res) => {
    res.status(200).send( await getCharges(req.property) );
};

module.exports = charges;