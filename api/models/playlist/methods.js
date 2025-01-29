const { extractVideoInfo } = require("../../utils");

const methods = (playlistSchema) => {
  playlistSchema.statics.createPlaylist = async function ({ name, userId }) {
    const Playlist = this;
    try {
      const playlist = new Playlist({ name, userId });
      await playlist.save();
      return playlist;
    } catch (err) {
      throw err;
    }
  };

  playlistSchema.statics.addVideoToPlaylist = async function ({
    playlistId,
    videoId,
    userId,
  }) {
    const Playlist = this;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.userId.toString() !== userId) {
        throw new Error("Unauthorized");
      }
      playlist.videos.push(videoId);
      await playlist.save();
    } catch (err) {
      throw err;
    }
  };

  playlistSchema.statics.removeVideoFromPlaylist = async function ({
    playlistId,
    videoId,
    userId,
  }) {
    const Playlist = this;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.userId.toString() !== userId) {
        throw new Error("Unauthorized");
      }
      playlist.videos = playlist.videos.filter(
        (video) => video.toString() !== videoId
      );
      await playlist.save();
    } catch (err) {
      throw err;
    }
  };

  playlistSchema.statics.getPlaylist = async function (userId) {
    const Playlist = this;
    try {
      const playlists = await Playlist.find({ userId }).populate("videos");
      return playlists;
    } catch (err) {
      throw err;
    }
  };

  playlistSchema.statics.deletePlaylist = async function ({
    playlistId,
    userId,
  }) {
    const Playlist = this;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.userId.toString() !== userId) {
        throw new Error("Unauthorized");
      }
      await playlist.remove();
    } catch (err) {
      throw err;
    }
  };

  playlistSchema.statics.getVideosFromPlaylist = async function ({
    playlistId,
    userId,
  }) {
    const Playlist = this;
    try {
      const playlist = await Playlist.findById(playlistId).populate("videos");
      if (playlist.userId.toString() !== userId) {
        throw new Error("Unauthorized");
      }

      return playlist.videos.map((video) => extractVideoInfo(video));
    } catch (err) {
      throw err;
    }
  };

  playlistSchema.statics.removePlaylist = async function ({
    playlistId,
    userId,
  }) {
    const Playlist = this;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.userId.toString() !== userId) {
        throw new Error("Unauthorized");
      }
      await playlist.remove();
    } catch (err) {
      throw err;
    }
  };
};

module.exports = methods;
