const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Sample route
app.get('/', function(req, res) {
  res.send('Timestamp microservice');
});

app.listen(port, function() {
  console.log("App is alive at port " + port);
});
