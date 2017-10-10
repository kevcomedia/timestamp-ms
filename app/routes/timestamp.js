const moment = require('moment');

const dateFormats = [
  'MMMM D, Y',
  'MMMM D Y',
  'D MMMM Y',
  'Y MMMM D',
  'MMM D, Y',
  'MMM D Y',
  'D MMM Y',
  'Y MMM D'
];

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
  const fromNatural
    = moment.utc(date, dateFormats, true);

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
