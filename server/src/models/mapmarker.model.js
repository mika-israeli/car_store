const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const markerSchema = new Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Marker", markerSchema, "markers");
