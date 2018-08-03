const isDate = require("date-fns/is_date");
const format = require("date-fns/format");
const parse = require("date-fns/parse");

const Exercise = require("../models/exercise");
const User = require("../models/user");

const userExists = id => {
  return User.findById(id);
};

const addNewExercise = async (req, res) => {
  const { description, duration, date } = req.body;

  try {
    // Check if the userid exists in the database
    let foundUser = await userExists(req.body.userid);

    if (!foundUser) {
      res.json({
        error: "No user found"
      });
    }

    const _date = isDate(parse(date)) ? date : format(new Date(), "YYYY-MM-DD");

    console.log(_date);

    const exercise = new Exercise({
      userId: foundUser._id,
      description,
      duration,
      date: _date
    });

    const submittedExercise = await exercise.save();

    res.json({
      message: "Succesfully added new exercise",
      exercise: submittedExercise
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addNewExercise
};
