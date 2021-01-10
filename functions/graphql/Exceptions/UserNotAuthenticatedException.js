
module.exports = class UserNotAuthenticatedException extends Error {
    constructor(message = "Not authenticated"){
        super();
        this.code = 421;
        this.message = message;
    }
  };
