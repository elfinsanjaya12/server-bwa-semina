const router = require('express').Router();
const {
  signup,
  signin,
  landingPage,
  detailPage,
  checkout,
  dashboard,
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');

router.post('/participants/auth/signup', signup);
router.post('/participants/auth/signin', signin);
router.get('/participants/landing-page', landingPage);
router.get('/participants/detail-page/:id', detailPage);
router.post('/participants/checkout', authenticateUser, checkout);
router.get('/participants/dashboard', authenticateUser, dashboard);

module.exports = router;
