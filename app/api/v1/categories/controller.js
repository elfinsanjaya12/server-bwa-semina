const Category = require('./model');
const { StatusCodes } = require('http-status-codes');
const CustomAPI = require('../../../errors');

const getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.find({ user: req.user.id });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user.id;

    const check = await Category.findOne({
      user,
      name,
    });

    if (check) throw new CustomAPI.BadRequestError('duplicate name category');

    const result = await Category.create({ name, user });

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await Category.findOne({
      _id: categoryId,
      user: req.user.id,
    });

    if (!result) {
      throw new CustomAPI.NotFoundError('No Category with id :' + categoryId);
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;
    const { name } = req.body;

    const check = await Category.findOne({
      name,
      _id: { $ne: categoryId },
    });

    if (check) {
      throw new CustomAPI.BadRequestError('Duplicate name category');
    }

    const result = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      { name, user: req.user.id },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new CustomAPI.NotFoundError('No Category with id :' + categoryId);
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await Category.findOne({ _id: categoryId });

    if (!result) {
      throw new CustomAPI.NotFoundError('No Category with id :' + categoryId);
    }

    await result.remove();
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
