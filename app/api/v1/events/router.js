const router = require('express').Router();
const {
  getAllEvent,
  createEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.get('/', authenticateUser, getAllEvent);
router.get('/:id', authenticateUser, getOneEvent);
router.post('/', authenticateUser, upload.single('cover'), createEvent);
router.put('/:id', authenticateUser, upload.single('cover'), updateEvent);
router.delete('/:id', authenticateUser, deleteEvent);

module.exports = router;
