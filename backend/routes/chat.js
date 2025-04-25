const express = require('express');
const router = express.Router();
const { askLLM } = require('../services/aiService');

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'No message provided' });

  const reply = await askLLM(message);
  res.json({ reply });
});

module.exports = router;

