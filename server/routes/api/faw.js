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
      { date, gids } = req.query,
      forecasts = typeof date === "undefined"
        ? []
        : await FAWForecasts.find(
          typeof gids === "undefined"
            ? { date: +date }
            : { date: +date, gid: { $in: gids.split(',') } }
        );

    if (!forecasts.length) throw new Error("The forecast data is not yet available");

    res.json(forecasts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
