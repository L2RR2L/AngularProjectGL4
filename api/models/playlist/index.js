const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

require("./methods")(playlistSchema);
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
