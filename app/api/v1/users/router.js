const express = require('express');
const router = express.Router();
const { getAllUser } = require('./controller');

router.get('/users', getAllUser);

module.exports = router;
