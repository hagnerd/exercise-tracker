const express = require("express");
const logController = require("../controllers/log");

const router = express.Router();

router.get("/", logController.getLog);

module.exports = router;
