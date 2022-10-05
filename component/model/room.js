const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roomSchemaModel = new schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rooms", roomSchemaModel);
