
module.exports = class UserNotAuthorized extends Error {
    constructor(message = 'User not authorized'){
        super()
        this.code = 431
        this.message = message
    }
  }
