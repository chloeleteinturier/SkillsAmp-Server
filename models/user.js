const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: String,
  firstName: String,
  lastName: String,
  email: {
    type:String,
    required: true,
    unique: true
},
  photoUrl: String,
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;