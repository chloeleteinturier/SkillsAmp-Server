const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema constructor

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
const assessmentSchema = require('./../schemas/assessmentSchema');

// CREATE THE SCHEMA
const checkpointSchema = new Schema({
  date: Date,
  assessments:{ type: [assessmentSchema] },
  currentCheckpoint: Boolean,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

// CREATE THE MODEL
const Checkpoint = mongoose.model('Checkpoint', checkpointSchema);


// EXPORT THE MODEL
module.exports = Checkpoint;