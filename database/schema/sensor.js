const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
  address: { type: String, required: true },
  min: Number,
  max: Number,
  algorithm: { type: String, enum: ["AVG10"], default: "AVG10", required: true },
});

module.exports = SensorSchema;

