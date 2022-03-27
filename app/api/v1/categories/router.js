const router = require('express').Router();
const {
  getAllCategory,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');

router.get('/', authenticateUser, getAllCategory);
router.post('/', authenticateUser, createCategory);
router.get('/:id', authenticateUser, getOneCategory);
router.put('/:id', authenticateUser, updateCategory);
router.delete('/:id', authenticateUser, deleteCategory);

module.exports = router;
