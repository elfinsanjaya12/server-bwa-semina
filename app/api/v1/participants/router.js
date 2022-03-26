const router = require('express').Router();
const { signup } = require('./controller');

router.post('/participants/auth/signup', signup);

module.exports = router;
