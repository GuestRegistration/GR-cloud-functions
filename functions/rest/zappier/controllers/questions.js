const {  getQuestions } = require('../helper/fields')

const questions = async (req, res) => {
    res.status(200).send( await getQuestions(req.property) );
};

module.exports = questions;