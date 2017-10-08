const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Sample route
app.get('/', function(req, res) {
  res.send('Timestamp microservice');
});

app.get('/:date', function(req, res) {
  const {date} = req.params;
  const timestamp = {};

  // Unix time
  if (!Number.isNaN(+date)) {
    const natural = new Date(date * 1000);
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    timestamp.unix = +date;
    timestamp.natural = natural.toLocaleDateString('en-US', dateOptions);
  }

  res.json(timestamp);
});

app.listen(port, function() {
  console.log("App is alive at port " + port);
});
