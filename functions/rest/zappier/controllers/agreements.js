const {  getAgreements } = require('../helper/fields')

const agreements = async (req, res) => {
    res.status(200).send( await getAgreements(req.property) );
};

module.exports = agreements;