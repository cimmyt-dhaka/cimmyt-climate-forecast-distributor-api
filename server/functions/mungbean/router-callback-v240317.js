const
  { timeFormat } = require("d3-time-format"),

  MungbeanForecasts = require("../../models/MungbeanForecasts.js"),

  getDate = require("./get-date.js"),
  forecastsToIVR = require("./forecasts-to-ivr-directives-v240317.js");


module.exports = async (req, res) => {
  try {
    const
      isProviderURL = req.path.startsWith("/ivr-provider"),
      isEuglenaURL = req.path.includes("euglena"),
      date = getDate(),
      forecasts = await MungbeanForecasts.find({ dateBroadcast: +timeFormat("%y%m%d")(date) });

    if (!forecasts.length) return res
      .status(500)
      .send(`The forecast data for ${ timeFormat("%B %-d, %Y")(date) } is not yet available. Please try again soon.`);

    const
      { outgoing, incoming } = forecastsToIVR({ forecasts, isEuglenaURL }),
      returnable = {
        dates: {
          outgoing: +timeFormat("%Y%m%d")(date),
          incoming: +timeFormat("%Y%m%d")(date)
        },
        outgoing: outgoing
          .map(el => isProviderURL ? { group: el.group, directives: el.directives, broadcast: el.broadcast } : el),
        incoming: incoming
          .map(el => isProviderURL ? { group: el.group, directives: el.directives } : el),
      };

    res.json(returnable);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
