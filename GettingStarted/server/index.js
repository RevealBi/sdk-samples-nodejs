const express = require('express');
const cors = require('cors');
const reveal = require('reveal-sdk-node');

const app = express();
app.use(cors());
app.use('/reveal-api/', reveal());
app.listen(8080);