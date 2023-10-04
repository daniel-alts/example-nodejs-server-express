const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  created_at: { type: Date, default: new Date() },
  name: { type: String, required: true },
  code: { type: String, unique: true },
  description: { type: String },
  department_id: { type: String },
  duration: { type: number, required: true },
});

const CourseModel = mongoose.model('courses', CourseSchema);

module.exports = CourseModel;
