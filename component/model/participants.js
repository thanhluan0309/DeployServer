const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PartiSchemaModel = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "users",
  },
  room: {
    type: schema.Types.ObjectId,
    ref: "rooms",
  },
});
module.exports = mongoose.model("Participants",PartiSchemaModel)
