const express = require('express');
const app = express();

const moment = require('moment');

// Sample route
app.get('/', function(req, res) {
  res.send('Timestamp microservice');
});

app.get('/:date', function(req, res) {
  const {date} = req.params;
  const timestamp = {
    unix: null,
    natural: null
  };

  if (!Number.isNaN(Number.parseInt(date, 10))) {
    const m = moment.unix(date);
    timestamp.unix = m.unix();
    timestamp.natural = m.format('MMMM D, YYYY');
  } else {
    const m = moment.utc(date);
    if (m.isValid()) {
      timestamp.unix = m.unix();
      timestamp.natural = m.format('MMMM D, YYYY');
    }
  }

  res.json(timestamp);
});

module.exports = app;
