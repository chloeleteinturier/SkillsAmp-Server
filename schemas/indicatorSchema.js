const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// CREATE A SCHEMA
const indicatorSchema = new Schema({
  name:{ type: String, required: true},
  levelOne:{ type: String},
  levelTwo:{ type: String},
  levelThree:{ type: String},
  levelFour:{ type: String},
  assessedLevel:{ type: Number, default: 0},
});

// EXPORT
module.exports = indicatorSchema;