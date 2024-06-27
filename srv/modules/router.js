/** 
 * Provides routing definitions for backend services.
 * @module
 */

'use strict';

const requestUtil = require('./requestUtil');
const userUtil = require('./userUtil');
const dataServiceUtil = require('./dataService');

/**
 * Defines routes for backend services.
 */
module.exports = {

    initRoutes : (app) => {
        
        // Define routes
        app.route('/srv/user')
            .get((req, res) => requestUtil.processRequest(userUtil, 'getUserInfo', req, res));
        
        //---------- dataServiceUtil ------------------------------------- 
        app.route("/srv/upload")
            .post((req, res, next) => requestUtil.processRequest(dataServiceUtil, "doUpload", req, res, next));


    }

};