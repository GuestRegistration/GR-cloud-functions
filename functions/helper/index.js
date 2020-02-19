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
     }
 }

 module.exports =  helper