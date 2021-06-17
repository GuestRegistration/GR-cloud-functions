/**
 * generate API key for Zapier
 */

const { v4: uuidv4  } = require('uuid');
const setIntegration = require('../helpers/setIntegration');

const GeneratePropertyApiKey = async (parent, {property_id }, context) => {

    const api_key = `${property_id}-${uuidv4()}`;

   return (await setIntegration(parent, { property_id, integration: { api_key } }, context)).api_key;

}; 

module.exports = GeneratePropertyApiKey;
 
 