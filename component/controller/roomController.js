const room = require("../model/room");
const jwt = require("jsonwebtoken");

class roomController {
  async createRoom(req, res) {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "input name is required" });
    } else {
      const createR = await room({ name: name });
      await createR.save();
      const Accesstoken = jwt.sign(
        { roomExit: createR._id },
        process.env.Accestoken
      );
      return res
        .status(200)
        .json({ success: true, createRoom: createR, Accesstoken: Accesstoken });
    }
  }
  async DeletedRoom(req, res) {
    try {
      await room.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ success: true, message: "xoa thanh cong" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllRoom(req, res) {
    try {
      const getRoom = await room.find({});
      res.status(200).json({ success: true, room: getRoom });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new roomController();
