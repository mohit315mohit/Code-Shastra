const together = require("together-ai");

require("dotenv").config();

together.apiKey = process.env.TOGETHER_API_KEY;

module.exports = together;
