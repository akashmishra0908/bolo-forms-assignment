const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: [{ questionId: String, response: String }],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
