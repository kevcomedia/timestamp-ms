const moment = require('moment');

function createTimestampObject(m = null) {
  if (m) {
    return {
      unix: m.unix(),
      natural: m.format('MMMM D, YYYY')
    };
  } else {
    return {
      unix: null,
      natural: null
    };
  }
}

function getTimestamp(req, res) {
  const {date} = req.params;
  let timestamp;

  const fromUnix = moment.unix(date);
  const fromNatural = moment.utc(date);

  if (fromUnix.isValid()) {
    timestamp = createTimestampObject(fromUnix);
  } else if (fromNatural.isValid()) {
    timestamp = createTimestampObject(fromNatural);
  } else {
    timestamp = createTimestampObject();
  }

  res.json(timestamp);
}

module.exports = {getTimestamp};
