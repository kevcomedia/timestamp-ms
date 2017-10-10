const path = require('path');
const express = require('express');
const app = express();

const timestamp = require('./app/routes/timestamp');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:date', timestamp.getTimestamp);

module.exports = app;
