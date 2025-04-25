const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoute = require('./routes/chatRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/', chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
