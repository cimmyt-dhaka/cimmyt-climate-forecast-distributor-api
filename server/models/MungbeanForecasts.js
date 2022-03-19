const
  { Schema, model } = require("mongoose"),

  MungbeanForecastSchema = new Schema({
    dateBroadcast: { type: Number, required: true },
    location: { type: String, required: true },
    rain: [{ type: Number, required: true }],
    skip: { type: Boolean, default: false }
  });

module.exports = model("mungbean-forecasts", MungbeanForecastSchema);
