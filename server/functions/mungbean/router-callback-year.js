const MungbeanForecasts = require("../../models/MungbeanForecasts.js");

module.exports = async (req, res) => {
  try {
    const { y } = req.params;
    if (typeof y !== "string" || y.length !== 4 || isNaN(+y) || +y <= 2018) return res.json([]);

    const forecasts = await MungbeanForecasts.find({
      dateBroadcast: { $gte: +`${y.slice(2)}0101`, $lte: +`${y.slice(2)}1231` }
    });

    res.json(forecasts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
