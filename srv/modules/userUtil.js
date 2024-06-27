/** 
 * Provides utility for user test
 */

'use strict'

module.exports = {
   
    getUserInfo: (req, res) => {
        
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");

        if (! req.authInfo.checkScope("$XSAPPNAME.CertificateAppUser"))
        {           
            res.status(403).send({message: "Forbidden"});
        }

        res.status(200).json(req.user);
    
    }
}
