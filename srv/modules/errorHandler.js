/** 
 * Provides Error handler for GENAI-Certification
 */
'use strict'
module.exports = (err, req, res, next) => {
  const { status, message } = err;
  res
    .setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains")
    .status(status)
    .send(
      {
        message: message
      });
}