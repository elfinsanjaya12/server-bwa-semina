const router = require('express').Router();
const {
  getAllSpeaker,
  createSpeaker,
  getOneSpeaker,
  updateSpeaker,
  deleteSpeaker,
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.get('/', authenticateUser, getAllSpeaker);
router.get('/:id', authenticateUser, getOneSpeaker);
router.post('/', authenticateUser, upload.single('avatar'), createSpeaker);
router.put('/:id', authenticateUser, upload.single('avatar'), updateSpeaker);
router.delete('/:id', authenticateUser, deleteSpeaker);

module.exports = router;
