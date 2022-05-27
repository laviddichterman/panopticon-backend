const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const logger = require('../logging');

if (!process.env.AUTH_DOMAIN) { 
  logger.error("Missing config for AUTH_DOMAIN ");
  process.exit(1);
}
if (!process.env.AUTH_AUDIENCE) { 
  logger.error("Missing config for AUTH_AUDIENCE");
  process.exit(1);
}

const authConfig = {
  domain: process.env.AUTH_DOMAIN,
  audience: process.env.AUTH_AUDIENCE
};
const CheckJWT = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
});

exports.CheckJWT = CheckJWT;

/**
 * Allows writing to the timing-related order settings
 */
//  exports.ScopeWriteLocation = requiredScopes("write:location");
/**
 * Allows reading the main service settings key-value store.
 */
// exports.ScopeRead = requiredScopes("read:settings");