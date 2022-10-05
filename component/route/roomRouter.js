const roomController = require("../controller/roomController");

const router = require("express").Router();
const verifyToken = require("../midleware/user");
router.post("/", roomController.createRoom);
router.post("/:id", roomController.DeletedRoom);
router.get("/", roomController.getAllRoom);
module.exports = router;
