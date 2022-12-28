const
  express = require("express"),
  router = express.Router(),
  
  FAWForecasts = require("../../models/FAWForecasts.js");


// @route    GET /api/faw-forecasts/upazila
// @desc     Get aggregated data for season and area
// @access   Public
router.get("/upazila", async (req, res) => {
  try {
    const
      { date, gid } = req.query,
      forecasts = typeof date === "undefined"
        ? []
        : await FAWForecasts.find(
          typeof gid === "undefined"
            ? { date: +date }
            : { date: +date, gid }
        );

    if (!forecasts.length) throw new Error("The forecast data is not yet available");

    res.json(forecasts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
