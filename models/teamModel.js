const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema constructor

// IMPORT THE SCHEMA TO USE IT AS A NESTED TYPE
// const indicatorSchema = require('./../schemas/indicatorShema');

// CREATE THE SCHEMA
const teamModel = new Schema({
  name:{ type: String, required: true},
  members:[{type: Schema.Types.ObjectId, ref: 'User'}],
  growthModel: {type: Schema.Types.ObjectId, ref: 'GrowthModel'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


// CREATE THE MODEL
const TeamModel = mongoose.model('TeamModel', teamModel);


// EXPORT THE MODEL
module.exports = TeamModel;