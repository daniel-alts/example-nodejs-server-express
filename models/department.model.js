const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DepartmentSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  created_at: { type: Date, default: new Date() },
  name: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true },
});

const DepartmentModel = mongoose.model('departments', DepartmentSchema);

module.exports = DepartmentModel;
