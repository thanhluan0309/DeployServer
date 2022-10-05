const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchamaModel = new schema({
  // user: {
  //   type: String,
  //   ref: "users",
  // },
  room: {
    type: String,
    ref: "rooms",
  },
  message: {
    type: String,
  },
});
module.exports = mongoose.model("messages", messageSchamaModel);
