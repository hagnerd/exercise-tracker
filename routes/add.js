const express = require("express");
const exerciseController = require("../controllers/exercise");
const router = express.Router();

router.post("/", exerciseController.addNewExercise);

module.exports = router;
