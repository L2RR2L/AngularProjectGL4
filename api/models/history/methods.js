const History = require("./index");
const { extractVideoInfo } = require("../../utils");

const methods = (historySchema) => {
  historySchema.statics.saveWatchHistory = async function ({
    userId,
    videoId,
  }) {
    try {
      const history = new History({ user: userId, video: videoId });
      await history.save();
    } catch (err) {
      throw err;
    }
  };

  historySchema.statics.getWatchHistory = async function (userId) {
    try {
      const history = await History.find({ user: userId })
        .populate("video")
        .sort({ watchedAt: -1 });
      return history.map((entry) => extractVideoInfo(entry.video));
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
