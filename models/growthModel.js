const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema constructor

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
const indicatorSchema = require('../schemas/indicatorSchema');

// CREATE THE SCHEMA
const growthModel = new Schema({
  name:{ type: String, required: true, unique: true},
  indicators:{ type: [indicatorSchema], required: true},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


// CREATE THE MODEL
const GrowthModel = mongoose.model('GrowthModel', growthModel);


// EXPORT THE MODEL
module.exports = GrowthModel;