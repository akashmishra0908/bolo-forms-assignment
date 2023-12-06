const mongoose = require('mongoose');
const Question = require('./Question');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: String,
  questions: [Question.schema],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
