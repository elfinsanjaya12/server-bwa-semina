const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
  createJWT,
  isTokenValid,
};
