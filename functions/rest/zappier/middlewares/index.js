const jwt = require('jsonwebtoken');
const firebaseAdmin = require('../../../admin');
const collections = require('../../../enums/collections');
const { zapier, jwt: jwtConfig } = require('../../../config');

const firestore = firebaseAdmin.firestore();

/**
 * Verify property API key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyApiKey = async (req, res, next) => {
  const key = req.headers['x-property-api-key'];

  if (!key) {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'API Key missing',
    });
  }

  const propertyId = key.split('-')[0];

  try {    
    const integrationDoc = await firestore.collection(collections.property.main).doc(propertyId)
      .collection(collections.property.meta.name).doc(collections.property.meta.documents.integrations)
      .get();

    if(!integrationDoc.exists){
      return res.status(401).send({
        status: 'Unauthorized',
        message: 'Invalid API Key',
      });
    }

    if(integrationDoc.data().api_key !== key) {
      return res.status(401).send({
        status: 'Unauthorized',
        message: 'Invalid API Key',
      });
    }
    
    req.property = propertyId;
    next();
    return true;
  } catch (error) {
    return res.status(401).send({
      status: 'error',
      message: error.message,
      name: error.name,
    });
  }
};

/**
 * Verify client credentials for requeting access token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyClient = async (req, res, next) => {
  const { client_id, client_secret } = req.body;

  if(zapier.client_id === client_id && zapier.client_secret === client_secret) {
    return next();
  } 
  return res.status(401).send({
    status: 'Unauthorized',
    message: 'Invalid client Id/Secret',
  });
}

/**
 * Verify Oauth code for requesting access token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyOauthCode = async (req, res, next) => {
  const { code } = req.body;
  const propertyId = code.split('-')[0];
  const propertyRef = firestore.collection(collections.property.main).doc(propertyId);

  const property = await propertyRef.get();
  if(!property.exists) {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'Invalid authorization code',
    });
  }
  req.property = property.data();

  const integrations = await propertyRef.collection(collections.property.meta.name).doc(collections.property.meta.documents.integrations).get()
  
  if(!integrations.exists)
  {
    return res.status(404).send({
      status: 'Not Found',
      message: 'Property integrations not found',
    });
  }

  if(integrations.data().zapier_oauth_code !== code) {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'Invalid authorization code',
    });
  }

  return next();
}

/**
 * Verify property access token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyAccessToken = async (req, res, next) => {

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      status: 'unauthorized',
      message: 'Token not provided',
    });
  }
  const token = authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(401).send({
      status: 'unauthorized',
      message: 'Token not provided',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.signature);
    const propertyRef = firestore.collection(collections.property.main).doc(decoded.id);
    const property = await propertyRef.get();
    
    if (!property.exists) {
      return res.status(401).send({
        status: 'unauthorized',
        message: 'Property does not exist',
      });
    }
    req.property = property.data();

    const integrations = await propertyRef.collection(collections.property.meta.name).doc(collections.property.meta.documents.integrations).get();

    if(!integrations.exists)
    {
      return res.status(404).send({
        status: 'Not Found',
        message: 'Property integrations not found',
      });
    }

    req.integrations = integrations.data();
    
    if (integrations.data().zapier_access_token !== token) {
      return res.status(401).send({
        status: 'unauthorized',
        message: 'Invalid access token',
      });
    }

    return next();
  } catch (error) {
    return res.status(401).send({
      status: 'error',
      message: error.message,
      name: error.name,
    });
  }

}

module.exports = {
  verifyApiKey, 
  verifyClient,
  verifyOauthCode,
  verifyAccessToken
};
