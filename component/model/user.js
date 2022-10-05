const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchemaModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("users", UserSchemaModel);
