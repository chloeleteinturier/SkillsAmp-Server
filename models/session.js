const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema constructor

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
const assessmentSchema = require('./../schemas/assessmentSchema');

// CREATE THE SCHEMA
const sessionSchema = new Schema({
  date: Date,
  assessments:[{ type: [assessmentShema]}]
  currentSession: { Type: Boolean, default: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


// CREATE THE MODEL
const Session = mongoose.model('Team', sessionSchema);


// EXPORT THE MODEL
module.exports = Session;