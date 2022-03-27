const router = require('express').Router();
const {
  getAllPayment,
  createPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
  changeStatusPayment,
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.get('/', authenticateUser, getAllPayment);
router.get('/:id', authenticateUser, getOnePayment);
router.post('/', authenticateUser, upload.single('imageUrl'), createPayment);
router.put('/:id', authenticateUser, upload.single('imageUrl'), updatePayment);
router.delete('/:id', authenticateUser, deletePayment);
router.put('/:id/status', authenticateUser, changeStatusPayment);

module.exports = router;
