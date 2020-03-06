
module.exports = class ClientNotAuthorized extends Error {
    constructor(message = 'Client Not authorized'){
        super()
        this.code = 411
        this.message = message
    }
  }
