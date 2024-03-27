const
  { max } = require("d3-array"),
  { timeFormat } = require("d3-time-format"),

  locations = require("../../data/mungbean/240317_locations.json"),

  MungbeanForecasts = require("../../models/MungbeanForecasts.js"),

  getDate = require("./get-date.js"),

  rainToCase = rain =>
    rain < 5 ? "n"
      : rain < 23 ? "l"
        : rain < 39 ? "h"
          : rain >= 39 ? "v"
            : "",
  forecastToCharacterCodes = rainArr =>
    rainToCase(rainArr[0]) +
    rainToCase(rainArr[1]) +
    rainToCase(max(
      rainArr.length === 4 ? [rainArr[2], rainArr[3]]
        : [rainArr[2], rainArr[3], rainArr[4]]
    ));


module.exports = async (req, res) => {
  try {
    const
      date = getDate(),
      forecasts = await MungbeanForecasts.find({ dateBroadcast: +timeFormat("%y%m%d")(date) });

    if (!forecasts.length) return res
      .status(500)
      .send(`The forecast data for ${ timeFormat("%B %-d, %Y")(date) } is not yet available. Please try again soon.`);

    const
      areas = locations.map(location => ({
        upz_code: location.upz_code,
        dis: location.dis,
        upz: location.upz,
      })).filter(
        (location, i, arr) => arr.map(el => el.upz_code).indexOf(location.upz_code) === i
      ),
      forecastsCodes = forecasts.map(forecast => {
        const
          { location, rain } = forecast._doc,
          area = areas.find(area => area.upz_code === location);

        return { ...area, codes: forecastToCharacterCodes(rain) }
      });

    res.json(forecastsCodes);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
