const mongoose = require('mongoose');

const marksheetSchema = new mongoose.Schema({
  rollno: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  maths: { type: Number, required: true },
  science: { type: Number, required: true },
  english: { type: Number, required: true }
});

module.exports = mongoose.model('Marksheet', marksheetSchema);