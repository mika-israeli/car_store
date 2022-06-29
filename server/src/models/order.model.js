const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userDetails: {
      type: Object,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Car",
        required: true,
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema, "orders");
