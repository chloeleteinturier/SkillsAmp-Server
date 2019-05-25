const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
const indicatorSchema = require('./indicatorSchema');

// CREATE A SCHEMA
const assessmentSchema = new Schema({
  name: String,
  indicators:{ type: [indicatorSchema], required: true },
});

// EXPORT
module.exports = assessmentSchema;