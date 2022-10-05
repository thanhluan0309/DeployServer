const Participants = require("../model/participants");

class ParticipantsController {
  async AddParticipants(req, res) {
    const { user, room } = req.body;
    if (!user && !room) {
      return res
        .status(400)
        .json({ success: false, message: "input user and room is required" });
    } else {
      const cParticipants = await Participants({
        user: user,
        room: room,
      });
      await cParticipants.save();
      return res
        .status(200)
        .json({ success: true, MessageCreate: cParticipants });
    }
  }
}
module.exports = new ParticipantsController();
