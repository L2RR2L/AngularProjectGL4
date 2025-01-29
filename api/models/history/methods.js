const { extractVideoInfo } = require("../../utils");

const methods = (historySchema) => {
  historySchema.statics.saveWatchHistory = async function ({
    userId,
    videoId,
  }) {
    const History = this;
    try {
      const history = new History({ userId, video: videoId });
      await history.save();
    } catch (err) {
      throw err;
    }
  };

  historySchema.statics.getWatchHistory = async function (userId) {
    const History = this;
    try {
      const history = await History.find({ userId })
        .populate("video")
        .sort({ watchedAt: -1 });
      return history.map((item) => ({
        ...history,
        video: extractVideoInfo(item.video),
      }));
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
