const parse = require("date-fns/parse");
const isAfter = require("date-fns/is_after");
const isBefore = require("date-fns/is_before");
const subDays = require("date-fns/sub_days");

const Exercise = require("../models/exercise");
const User = require("../models/user");

const getLog = async (req, res) => {
  // Get the request query
  const { userId, from, to, limit } = req.query;

  try {
    // Find user in database
    const foundUser = await User.findById(userId);
    let query = await Exercise.find({ userId: foundUser._id });
    if (from) {
      query = query.filter(({ date }) =>
        isAfter(parse(date), subDays(parse(from), 1))
      );
    }
    if (to) {
      query = query.filter(({ date }) => isBefore(parse(date), parse(to)));
    }
    query.sort((a, b) => a.date - b.date);
    if (limit) {
      query = query.slice(0, parseInt(limit));
    }
    res.json({
      message: "success",
      exercises: query
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getLog
};
