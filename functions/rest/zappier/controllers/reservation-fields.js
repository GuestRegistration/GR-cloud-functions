const {  getAllFields } = require('../helper/fields')

const fields = async (req, res) => {
    res.status(200).send( await getAllFields(req.property) );
};

module.exports = fields;