const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
const growthCompassSchema = require('./growthCompassSchema');

// CREATE A SCHEMA
const assessmentSchema = new Schema({
  evaluator: {type: Schema.Types.ObjectId, ref: 'User'},
  evaluated: {type: Schema.Types.ObjectId, ref: 'User'},
  growthCompass: { type: [growthCompassSchema], required: true },
});

// EXPORT
module.exports = assessmentSchema;