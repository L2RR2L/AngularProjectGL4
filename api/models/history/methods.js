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
      const histories = await History.find({ userId })
        .populate("video")
        .sort({ watchedAt: -1 })
        .exec();
      console.log("histories", histories);

      const historiesWithVideos = histories.map((history) => ({
        ...history,
        video: extractVideoInfo(history.video),
      }));
      console.log("historiesWithVideos", historiesWithVideos);

      return historiesWithVideos;
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
