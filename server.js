const express = require('express');
const app = express();

const moment = require('moment');

const port = process.env.PORT || 3000;

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

  const m = moment.unix(date);
  // Unix time
  if (!Number.isNaN(m.unix())) {
    timestamp.unix = m.unix();
    timestamp.natural = m.format('MMMM D YYYY');
  }

  res.json(timestamp);
});

app.listen(port, function() {
  console.log("App is alive at port " + port);
});
