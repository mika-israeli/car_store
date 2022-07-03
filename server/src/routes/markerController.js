const router = require("express").Router();
const Marker = require("../models/mapmarker.model.js");
router.get("/", async (req, res) => {
  try {
    const markers = await Marker.find({});
    res.json(markers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const marker = await Marker.create(req.body);
    res.json(marker);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
