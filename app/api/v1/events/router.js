const router = require('express').Router();
const {
  getAllEvent,
  createEvent,
  // getOneSpeaker,
  // updateSpeaker,
  // deleteSpeaker,
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.get('/', authenticateUser, getAllEvent);
// router.get('/:id', authenticateUser, getOneSpeaker);
router.post('/', authenticateUser, upload.single('cover'), createEvent);
// router.put('/:id', authenticateUser, upload.single('avatar'), updateSpeaker);
// router.delete('/:id', authenticateUser, deleteSpeaker);

module.exports = router;
