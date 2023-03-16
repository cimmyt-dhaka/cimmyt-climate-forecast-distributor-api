const
  { timeFormat } = require("d3-time-format"),

  MungbeanForecasts = require("../../models/MungbeanForecasts.js"),

  getDate = require("./get-date.js"),
  forecastsToIVR = require("./forecasts-to-ivr-directives-v230317.js");


module.exports = async (req, res) => {
  try {
    const
      isProviderURL = req.path.startsWith("/ivr-provider"),
      date = getDate(),
      forecasts = await MungbeanForecasts.find({ dateBroadcast: +timeFormat("%y%m%d")(date) });

    if (!forecasts.length) return res
      .status(500)
      .send(`The forecast data for ${ timeFormat("%B %-d, %Y")(date) } is not yet available. Please try again soon.`);

    const
      { outgoing, incoming } = forecastsToIVR(forecasts),
      returnable = {
        dates: {
          outgoing: +timeFormat("%Y%m%d")(date),
          incoming: +timeFormat("%Y%m%d")(date)
        },
        outgoing: isProviderURL ? outgoing.map(el => ({
          group: el.group,
          directives: el.directives,
          broadcast: el.broadcast
        })) : outgoing,
        incoming: isProviderURL ? incoming.map(el => ({
          group: el.group,
          directives: el.directives
        })) : incoming
      };

    res.json(returnable);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
