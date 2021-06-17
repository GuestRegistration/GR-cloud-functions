/**
 * generate Oauth code for a property
 */
 const { v4: uuidv4  } = require('uuid');
const setIntegration = require('../helpers/setIntegration');
const { zapier } = require('../../../../../config');

const GenerateZapierOauthCode = async (parent, { property_id, client_id, redirect_uri, response_type, state }, context) => {
    
    if(client_id !== zapier.client_id) throw new Error("Invalid client ID");
    if(response_type !== zapier.response_type) throw new Error("Invalid response type");

    if(redirect_uri && !zapier.redirect_uri.includes(redirect_uri)) throw new Error("Invalid redirect uri");
    else{
        redirect_uri = zapier.redirect_uri
    }

    const code = `${property_id}-${uuidv4()}`;

    await setIntegration(parent, { property_id, integration: { zapier_oauth_code: code } }, context);

    return `${redirect_uri}?code=${code}&state=${state}`;
}; 

module.exports = GenerateZapierOauthCode;
 
 