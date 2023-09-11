const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  created_at: { type: Date, default: new Date() },
  name: { type: String, required: true },
  email: { type: String, },
  contact: { type: String },
  password: { type: String, required: true },
  phone_number: { type: String },
  gender:  { 
    type: String, 
    required: true,
    enum: ['male', 'female'], 
  }
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
