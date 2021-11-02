const { Schema, model } = require("mongoose");

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be filled"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Category", categorySchema);
