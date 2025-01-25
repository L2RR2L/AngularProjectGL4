const express = require("express");
const router = express.Router();
const History = require("../models/history");

router.post("/save", async (req, res) => {
  const { userId, videoId } = req.body;
  try {
    await History.saveWatchHistory({ userId, videoId });
    res.status(200).json({ message: "History saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving history", error: err });
  }
});

router.get("/", async (req, res) => {
  const userId = req.userId;
  try {
    console.log("userId", userId);

    const history = await History.getWatchHistory(userId);
    console.log("history", history);

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving history", error: err });
  }
});

module.exports = router;
