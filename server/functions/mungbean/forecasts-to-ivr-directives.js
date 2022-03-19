const
  { max } = require("d3-array"),
  { timeDay } = require("d3-time"),
  { timeFormat, timeParse } = require("d3-time-format"),

  areas = require("../../data/mungbean/220317_locations.json"),
  generateDirectives = require("./generate-directives-sequence.js"),

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


module.exports = forecasts => forecasts
  .reduce((acc, el) => {
    const
      { dateBroadcast: date_ymd, location, rain, skip } = el,
      { dis: district, upz: upazila, unn: union, group: t, id: l } = areas
        .find(area => `l${location}` === area.id),
      characterCodes = forecastToCharacterCodes(rain),
      elForecast = rain.map((rainfall, i) => ({
        date: timeDay.offset(timeParse("%y%m%d")(`${date_ymd}`), i + 1),
        rainfall
      })),
      rainDates = elForecast
        .map(rainDate => rainDate.date),
      elDirectives = ({ isIncoming }) => ["gm", "gf"].map(g => {
        let returnable = {
          group: `${t}_${g}_${l}`,
          district,
          upazila,
          union,
          forecast: elForecast.map(rainDate => ({
            date: +timeFormat("%Y%m%d")(rainDate.date),
            rainfall: rainDate.rainfall
          })),
          forecastCode: characterCodes,
          directives: generateDirectives({ isIncoming, g, l, t, characterCodes, dates: rainDates }),
        };
        if (!isIncoming) returnable.skipBroadcast = skip;
        return returnable;
      });

    return {
      outgoing: [...acc.outgoing, ...elDirectives({ isIncoming: false })],
      incoming: [...acc.incoming, ...elDirectives({ isIncoming: true })]
    }
  }, { outgoing: [], incoming: [] });
