const Message = require("../model/message");

class messageController {
  async addMessage(req, res) {
    const { message, room } = req.body;
    if (!room) {
      return res
        .status(400)
        .json({ success: false, message: "input room is required" });
    } else {
      const createM = await Message({
        message: message,
        
        room: room,
      });
      await createM.save();
      return res.status(200).json({ success: true, MessageCreate: createM });
    }
  }
  async updateMessage(req, res) {
    const { room, message } = req.body;
    const findMess = {  room: room };
    const saveMess = await Message.findOneAndUpdate(
      findMess,
      {
        message: message,
      },
      { new: true }
    );
    return res.status(200).json({ success: true, UpdateMessage: saveMess });
  }
  async getMessage(req, res) {
    const { room } = req.body;
    const findMess = { room: room };
    const saveMess = await Message.findOne(findMess);
    return res.status(200).json({ success: true, GetMessage: saveMess });
  }
}
module.exports = new messageController();
