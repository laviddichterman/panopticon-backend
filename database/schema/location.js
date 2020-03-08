const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  description: String,
  name: { type: String, required: true },
  sensors: [String],
  // alarm settings?
});

module.exports = LocationSchema;