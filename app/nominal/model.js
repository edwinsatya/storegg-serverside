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
      required: [true, "Coin Qty must be filled"],
    },
    coinPrice: {
      type: Number,
      default: 0,
      required: [true, "Coin Price must be filled"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Nominal", nominalSchema);
