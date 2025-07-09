require('dotenv').config();

module.exports = {
  port: process.env.PORT || 123,
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    accessTokenExpiresInSeonds: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  }
};
