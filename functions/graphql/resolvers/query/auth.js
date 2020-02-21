const auth = {
    user_token: (parent) => parent.user_token,
    user_token_valid: (parent) => parent.user_token_valid,
    user_uid: (parent) => parent.user_uid,
    client_token: (parent) => parent.client_token,
    client_token_valid: (parent) => parent.client_token_valid,
}

module.exports = auth