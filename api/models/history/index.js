const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
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

require("./methods")(historySchema);
const History = mongoose.model("History", historySchema);

module.exports = History;
