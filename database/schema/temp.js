const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempSchema = new Schema({
  sensor: String,
  timestamp: Number,
  temperature: Number
});

module.exports = TempSchema;