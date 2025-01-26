const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");

const errorResponse = require("../utils/error");

router.get("/", async (req, res) => {
  const userId = req.userId;
  try {
    const playlists = await Playlist.getPlaylist(userId);
    res.status(200).json(playlists);
  } catch (err) {
    errorResponse(res, err);
  }
});
router.post("/", async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;
  console.log("userId", userId);

  try {
    const playlist = await Playlist.createPlaylist({
      name,
      userId,
    });
    res.status(200).json(playlist);
  } catch (err) {
    errorResponse(res, err);
  }
});

//remove playlist
router.delete("/", async (req, res) => {
  const { playlistId } = req.body;
  const userId = req.userId;
  try {
    await Playlist.removePlaylist({ playlistId, userId });
    res.status(200).json({ message: "Playlist deleted" });
  } catch (err) {
    errorResponse(res, err);
  }
});

router.post("/add", async (req, res) => {
  const { playlistId, videoId } = req.body;
  const userId = req.userId;
  try {
    await Playlist.addVideoToPlaylist({ playlistId, videoId, userId });
    res.status(200).json({ message: "Video added to playlist" });
  } catch (err) {
    errorResponse(res, err);
  }
});

router.delete("/remove", async (req, res) => {
  const { playlistId, videoId } = req.body;
  const userId = req.userId;
  try {
    await Playlist.removeVideoFromPlaylist({ playlistId, videoId, userId });
    res.status(200).json({ message: "Video removed from playlist" });
  } catch (err) {
    errorResponse(res, err);
  }
});

//get video from playlist
router.get("/:playlistId", async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.userId;
  try {
    const videos = await Playlist.getVideosFromPlaylist({
      playlistId,
      userId,
    });
    res.status(200).json(videos);
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;
