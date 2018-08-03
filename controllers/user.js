const User = require("../models/user");

const createNewUser = async (req, res) => {
  const user = new User({
    username: req.body.username
  });

  try {
    const newUser = await user.save();
    // look up http code for successful resource creation
    res.status(200).json({
      response: "User succesfully created",
      user: newUser
    });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(409).send(new Error("Duplicate key"));
    }
    res.status(500).send(err);
  }
};

module.exports = {
  createNewUser
};
