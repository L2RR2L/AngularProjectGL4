const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "{PATH} is required"],
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: [true, "{PATH} is required"],
    },
    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
