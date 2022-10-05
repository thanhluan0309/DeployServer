const messageController = require('../controller/messageController')

const router = require('express').Router()

router.post("/",messageController.addMessage)
router.put("/",messageController.updateMessage)
router.post("/getMess",messageController.getMessage)
module.exports = router