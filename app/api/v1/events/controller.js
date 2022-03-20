const { StatusCodes } = require('http-status-codes');
const CustomAPI = require('../../../errors');
const Event = require('./model');
const Category = require('../categories/model');
const Speaker = require('../speakers/model');

const getAllEvent = async (req, res, next) => {
  try {
    const { keyword, category, speaker } = req.query;
    const user = req.user.id;

    let condition = { user: user };

    if (keyword) {
      condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
    }

    if (category) {
      condition = { ...condition, category: category };
    }

    if (speaker) {
      condition = { ...condition, speaker: speaker };
    }

    const result = await Event.find(condition)
      .populate({
        path: 'category',
        select: '_id name',
      })
      .populate({
        path: 'speaker',
        select: '_id name role avatar',
      });

    result.forEach((result) => {
      result._doc.speaker._doc.foto = result._doc.speaker._doc.avatar;
      delete result._doc.speaker._doc.avatar;
    });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      price,
      date,
      about,
      venueName,
      tagline,
      keyPoint,
      category,
      speaker,
    } = req.body;

    const user = req.user.id;

    if (!keyPoint)
      throw new CustomAPI.BadRequestError('Please provide key point');

    const checkCategory = await Category.findOne({ _id: category });
    const checkSpeaker = await Speaker.findOne({ _id: speaker });

    if (!checkCategory) {
      throw new CustomAPI.NotFoundError('No Category with id :' + category);
    }

    if (!checkSpeaker) {
      throw new CustomAPI.NotFoundError('No Speaker with id :' + speaker);
    }

    let result;

    if (!req.file) {
      throw new CustomAPI.BadRequestError('Please upload image / cover');
    } else {
      result = new Event({
        title,
        price,
        date,
        about,
        venueName,
        tagline,
        keyPoint: JSON.parse(keyPoint),
        category,
        speaker,
        cover: req.file.filename,
        user,
      });
    }

    await result.save();

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllEvent, createEvent };
