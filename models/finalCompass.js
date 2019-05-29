const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema constructor

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
const growthCompassSchema = require('./../schemas/growthCompassSchema');

// CREATE THE SCHEMA
const finalCompassSchema = new Schema({
  evaluated: {type: Schema.Types.ObjectId, ref: 'User'},
  growthCompass:{ type: growthCompassSchema},
  toImprove: {type: Array, default: []},
  done: {type: Boolean, default: false},
  team:{type: Schema.Types.ObjectId, ref: 'Team'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

// CREATE THE MODEL
const FinalCompass = mongoose.model('FinalCompass', finalCompassSchema);


// EXPORT THE MODEL
module.exports = FinalCompass;