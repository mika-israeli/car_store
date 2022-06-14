const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carSchema = new Schema(
  {
    maker: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    kilometers: {
      type: Number,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("car", carSchema, "cars");
module.exports = Car;
