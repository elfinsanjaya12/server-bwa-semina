const Participant = require('./model');
const { StatusCodes } = require('http-status-codes');
// const CustomAPI = require('../../../errors');
// const { createTokenUser, createJWT } = require('../../../utils');

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const result = new Participant({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    await result.save();

    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup };
