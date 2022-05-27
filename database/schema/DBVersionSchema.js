const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DBVersionSchema = new Schema({ major: Number, minor: Number, patch: Number });

module.exports = DBVersionSchema;
