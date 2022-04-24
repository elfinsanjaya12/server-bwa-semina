const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
console.log(process.env.MODE);
module.exports = {
  rootPath: path.resolve(__dirname, '../../'),
  urlDb:
    process.env.MODE === 'PRO'
      ? process.env.MONGODB_URL_PRO
      : process.env.MONGODB_URL_DEV,
  jwtSecret: process.env.JWT_SECRET,
};
