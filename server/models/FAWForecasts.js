const
  { Schema, model } = require("mongoose"),

  FAWForecastSchema = new Schema({
    gid: { type: String, required: true },
    date: { type: Number, required: true },
    prec: [{ type: Number, required: true }],
    t2: [{ type: Number, required: true }]
  });

module.exports = model("faw-forecasts", FAWForecastSchema);
