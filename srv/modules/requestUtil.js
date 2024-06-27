/** 
 * Provides request utility
 */

'use strict';
const logger = require("./logger");
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

module.exports = {
    
    /**
     *  process request and sends response.
     */
    processRequest : (module, method, ...args) => {
        
        const res = args[1];
        try {
            // Process request
            module[method].apply(module, args);
            
        } catch (err) {

            res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
            res.status(400).json({ message: err.message });
            
        }
    },

    postToIflow: async (req, res, next, relativeURL, payload) => {
        
        if (! req.authInfo.checkScope("$XSAPPNAME.CertificateAppUser"))
        {
            res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
            res.status(403).send({message: "Forbidden"});
        }
               
        try 
        {                  
        
            let resultResponse =
            {
                "ResultStatus":
                {
                    "status": 200
                },
                "ResultData": JSON.parse(payload)
            }
            const destination = process.env.DESTINATION
            await executeHttpRequest(
                { 
                    destinationName: destination 
                },
                {
                    method: 'POST',
                    url: relativeURL,
                    data: payload,
                    timeout: 300000,
                    headers: {
                        "content-type": "application/json"
                    }
                },
                {
                    fetchCsrfToken: false
                }
            );

            res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
            res.status(200).json(resultResponse);      
            
        } catch(err) {
            //log error and pass err to error handler
            logger.error(err.stack);
            next(err);
        }
    }
}