const isDate = require("date-fns/is_date");
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
    console.log(foundUser);

    let formattedDate;

    if (isDate(date)) {
      formattedDate = date;
    } else {
      formattedDate = new Date();
    }

    const exercise = new Exercise({
      userId: foundUser._id,
      description,
      duration,
      date: formattedDate
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
