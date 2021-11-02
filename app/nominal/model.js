const { Schema, model } = require("mongoose");

const nominalSchema = Schema(
  {
    coinName: {
      type: String,
      required: [true, "Coin Name must be filled"],
    },
    coinQty: {
      type: Number,
      default: 0,
    },
    coinPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Nominal", nominalSchema);
