const {  getInstructions } = require('../helper/fields')

const instructions = async (req, res) => {
    res.status(200).send( await getInstructions(req.property) );
};

module.exports = instructions;