const participantsController = require("../controller/participantsController");

const router = require("express").Router();

router.post("/", participantsController.AddParticipants);

module.exports = router;
