const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
  min: Number,
  max: Number,
  algorithm: { type: String, enum: ["AVG10"], default: "AVG10", required: true },
});

SensorSchema.virtual('address').get(function() {
  return this._id;
});

module.exports = SensorSchema;

