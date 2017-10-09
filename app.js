const express = require('express');
const app = express();

const timestamp = require('./app/routes/timestamp');

// Sample route
app.get('/', function(req, res) {
  res.send('Timestamp microservice');
});

app.get('/:date', timestamp.getTimestamp);

module.exports = app;
