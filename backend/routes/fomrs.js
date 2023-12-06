const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');

router.post('/', async (req, res) => {
  try {
    const newForm = await Form.create(req.body);
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ error: 'Some error' });
  }
});
router.get('/:formId', async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Some error'  });
  }
});
router.post('/:formId/submit', async (req, res) => {
  try {
    const formId = req.params.formId;
    const answers = req.body.responses.map(({ questionId, response }) => ({ questionId, response }));
    const newResponse = await Response.create({ formId, answers });
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ error: 'Some error'  });
  }
});

module.exports = router;
