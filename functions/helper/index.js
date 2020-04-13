/**
 * some helper functions
 */

 const helper = {
     /**
      * get the current timestamp
      */
     nowTimestamp: () => new Date().getTime(),
     /**
      * sort an object by the key
      */
     sortObject: (obj) => {
         const sorted = {};
        Object.keys(obj).sort().forEach((key) => {
            sorted[key] = obj[key];
        })
        return sorted
     },
     /**
      * check if a phone number is valid
      */
     validatePhoneNumber: async (number, country) => {
        const twilio_key = require('./../key/twilio')
        try{
            const client = require('twilio')(twilio_key.accountSid, twilio_key.authToken);
            const phone = await client.lookups.phoneNumbers(number).fetch({})
            return {
                valid: true,
                data: phone
            }
        } 
        catch(e){
            if(e.status === 404){
                return {
                    valid: false,
                    data: null
                }
            }else{
                throw new Error(e.message)
            }             
        }
     }
 }

 module.exports =  helper