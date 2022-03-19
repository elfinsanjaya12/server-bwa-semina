const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  urlDb: process.env.MONGODB_URL_DEV,
  jwtSecret: process.env.JWT_SECRET,
};
