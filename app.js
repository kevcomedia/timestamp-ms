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

  {
    let m = moment.unix(date);
    if (m.isValid()) {
      timestamp.unix = m.unix();
      timestamp.natural = m.format('MMMM D, YYYY');
    } else {
      m = moment.utc(date);
      if (m.isValid()) {
        timestamp.unix = m.unix();
        timestamp.natural = m.format('MMMM D, YYYY');
      }
    }
  }

  res.json(timestamp);
});

module.exports = app;
