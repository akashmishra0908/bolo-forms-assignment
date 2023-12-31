const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
