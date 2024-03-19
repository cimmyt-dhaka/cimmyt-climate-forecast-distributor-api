const
  { max } = require("d3-array"),
  { timeDay } = require("d3-time"),
  { timeFormat, timeParse } = require("d3-time-format"),

  areas = require("../../data/mungbean/240317_locations.json"),
  generateDirectives = require("./generate-directives-sequence-v240317.js"),

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


module.exports = ({ forecasts, isEuglenaURL }) => areas
  .reduce((acc, el) => {
    const { dis: district, upz: upazila, unn: union, area_code: l, upz_code, euglena } = el;
    if (isEuglenaURL && !euglena) return acc;

    const
      { dateBroadcast: date_ymd, rain, skip } = forecasts.find(forecast => forecast.location === upz_code),

      characterCodes = forecastToCharacterCodes(rain),
      elForecast = rain.map((rainfall, i) => ({ date: timeDay.offset(timeParse("%y%m%d")(`${date_ymd}`), i + 1), rainfall })),
      rainDates = elForecast.map(day => day.date),

      elDirectives = ({ isIncoming }) => ["gm", "gf"].map(g => {
        let returnable = {
          group: `${g}_${l}`,
          district,
          upazila,
          union,
          forecast: elForecast.map(day => ({ date: +timeFormat("%Y%m%d")(day.date), rainfall: day.rainfall })),
          forecastCode: characterCodes,
          directives: generateDirectives({ isEuglenaURL, isIncoming, g, l, characterCodes, dates: rainDates }),
        };

        if (!isIncoming) returnable.broadcast = !skip;

        return returnable;
      });

    return {
      outgoing: [...acc.outgoing, ...elDirectives({ isIncoming: false })],
      incoming: [...acc.incoming, ...elDirectives({ isIncoming: true })]
    }
  }, { outgoing: [], incoming: [] });
