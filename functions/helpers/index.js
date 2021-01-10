/**
 * some helper functions
 */
const config = require('../config');

const helpers = {
  /**
   * get the current timestamp
   */
  nowTimestamp: () => new Date().getTime(),

  /**convert timestamp to human readable */
  resolveTimestamp: (timestamp) => {
     timestamp = parseInt(timestamp);

     let date = new Date((timestamp));
     let now = new Date();
     let seconds_difference = now.getTime() - date.getTime();
     let diff = '';
     if(seconds_difference > 604800000){
       diff = Math.floor(seconds_difference/604800000)+'w'; // estimate in weeks
     }else if(seconds_difference > 86400000){
       diff = Math.floor(seconds_difference/86400000)+'d'; // estimate in days
     }else if(seconds_difference > 3600000){
       diff = Math.floor(seconds_difference/3600000)+'h'; // estimate in hours
     }else if(seconds_difference > 60000){
       diff = Math.floor(seconds_difference/60000)+'m'; // estimate in minutes
     }else{
       diff = Math.floor(seconds_difference/1000)+'s'; //estimate in seconds
     }
     return `${date.toDateString()}, ${diff} ago`;
 },
  /**
   * sort an object by the key
   */
  sortObject: (obj) => {
      const sorted = {};
     Object.keys(obj).sort().forEach((key) => {
         sorted[key] = obj[key];
     });
     return sorted;
  },
  /**
   * check if a phone number is valid
   */
  validatePhoneNumber: async (number, country) => {
     try{
         const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
         const phone = await client.lookups.phoneNumbers(number).fetch({});
         return {
             valid: true,
             data: phone
         };
     } 
     catch(e){
         if(e.status === 404){
             return {
                 valid: false,
                 data: null
             };
         }else{
             throw new Error(e.message);
         }             
     }
  }
};

module.exports = helpers;