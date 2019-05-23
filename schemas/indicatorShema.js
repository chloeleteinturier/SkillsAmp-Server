const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// CREATE A SCHEMA
const indicatorSchema = new Schema({
  name:{ type: String, required: true},
  levelOne:{ type: String, required: true},
  levelTwo:{ type: String, required: true},
  levelThree:{ type: String, required: true},
  levelFour:{ type: String, required: true},
  assessedLevel:{ type: Number, default: 0},
});

// EXPORT
module.exports = indicatorSchema;