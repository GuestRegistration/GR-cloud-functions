
const jwt = require('jsonwebtoken')
const { jwt: jwtConfig } = require('../../../config');
const firebaseAdmin = require('../../../admin');
const collections = require('../../../enums/collections');

/**
 * Request new access token for a property
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const accessToken = async (req, res) => {

    const firestore = firebaseAdmin.firestore();

    try {
        const access_token = jwt.sign({
            id: req.property.id
        }, jwtConfig.signature);
    
        await firestore.collection(collections.property.main).doc(req.property.id)
            .collection(collections.property.meta.name).doc(collections.property.meta.documents.integrations)
            .update({
                zapier_access_token: access_token
            });
    
        return res.status(200).json({
            access_token,
            property: req.property.name
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        })
    }
};

module.exports = accessToken;