const integrations = {
    zapier_authorized: (parent) => parent.zapier_access_token ? true : false,
};

module.exports = integrations;