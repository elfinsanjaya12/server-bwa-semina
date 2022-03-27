const Transaction = require('./model');
const moment = require('moment');

const getAllTransaction = async (req, res, next) => {
  try {
    const {
      limit = 10,
      page = 1,
      event,
      keyword,
      startDate,
      endDate,
    } = req.query;

    let condition = { user: req.user.id };

    if (event) {
      condition = { ...condition, event: event };
    }

    if (startDate && endDate) {
      condition = {
        ...condition,
        'historyEvent.date': {
          $gte: startDate,
          $lte: moment(endDate).add(1, 'days'),
        },
      };
    }

    if (keyword) {
      condition = {
        ...condition,
        'historyEvent.title': { $regex: keyword, $options: 'i' },
      };
    }

    const result = await Transaction.find(condition)
      .limit(limit)
      .skip(limit * (page - 1));

    const count = await Transaction.countDocuments(condition);

    res
      .status(200)
      .json({ data: result, pages: Math.ceil(count / limit), total: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { getAllTransaction };
