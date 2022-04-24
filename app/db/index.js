const mongoose = require('mongoose');
const { urlDb } = require('../config');

console.log(urlDb);

mongoose.connect(urlDb);

const db = mongoose.connection;

module.exports = db;
