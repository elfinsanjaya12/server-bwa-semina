const { StatusCodes } = require('http-status-codes');
const CustomAPI = require('../../../errors');
const Event = require('./model');
const Category = require('../categories/model');
const Speaker = require('../speakers/model');
const fs = require('fs');
const config = require('../../../config');

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
        select: { _id: 1, foto: '$avatar', avatar: 1, name: 1, role: 1 },
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
      stock,
      status,
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
        stock,
        status,
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

const getOneEvent = async (req, res, next) => {
  try {
    const { id: eventId } = req.params;

    const result = await Event.findOne({ _id: eventId });

    if (!result) {
      throw new CustomAPI.NotFoundError('No Event with id :' + eventId);
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id: eventId } = req.params;
    const {
      title,
      price,
      date,
      about,
      venueName,
      tagline,
      keyPoint,
      stock,
      status,
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

    let result = await Event.findOne({ _id: eventId });

    if (!req.file) {
      result.title = title;
      result.price = price;
      result.date = date;
      result.about = about;
      result.venueName = venueName;
      result.tagline = tagline;
      result.keyPoint = JSON.parse(keyPoint);
      result.category = category;
      result.speaker = speaker;
      result.user = user;
      result.status = status;
      result.stock = stock;
    } else {
      let currentImage = `${config.rootPath}/public/uploads/${result.cover}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      result.title = title;
      result.price = price;
      result.date = date;
      result.about = about;
      result.venueName = venueName;
      result.tagline = tagline;
      result.keyPoint = JSON.parse(keyPoint);
      result.category = category;
      result.speaker = speaker;
      result.user = user;
      result.cover = req.file.filename;
      result.status = status;
      result.stock = stock;
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const user = req.user.id;
    const { id: eventId } = req.params;

    let result = await Event.findOne({ _id: eventId, user });

    if (!result) {
      throw new CustomAPI.NotFoundError('No Event with id :' + eventId);
    }

    let currentImage = `${config.rootPath}/public/uploads/${result.cover}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    await result.remove();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEvent,
  createEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
};
