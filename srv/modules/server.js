/**
 * GENAI-Certification App Service
 */

"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router");
const xsenv = require("@sap/xsenv");
let JWTStrategy = require("@sap/xssec").JWTStrategy;
const passport = require("passport");
const logger = require("./logger");
const errorHandler = require("./errorHandler");

/**
 * Starts server
 */
module.exports = {

  startServer: () => {
   
    //xsuaa security
    xsenv.loadEnv();
    xsenv.getServices({ uaa: { tag: "xsuaa" } });
    passport.use(
      new JWTStrategy(xsenv.getServices({ xsuaa: { tag: "xsuaa" } }).xsuaa)
    );
    app.use(passport.initialize());
    app.use(passport.authenticate("JWT", { session: false }));

    app.use(express.json());

    // Init routes
    router.initRoutes(app);

    //Error handler
    app.use(errorHandler);

    //checkmarx CSP header security
    app.use(function(req, res, next) {
      res.setHeader("Content-Security-Policy", "script-src 'self'");
      return next();
    });

    // Start server
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      logger.info(`Starting server at ${port}`);
    });
  },
};
