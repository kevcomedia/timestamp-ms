const moment = require('moment');

const dateFormats = [
  'MMMM D, Y',
  'MMMM D Y',
  'D MMMM Y',
  'Y MMMM D',
  'MMM D, Y',
  'MMM D Y',
  'D MMM Y',
  'Y MMM D',
];

/**
 * Returns an object that contains a Unix time and its corresponding natural
 * date from the provided moment object. If there is none provided, the object
 * will have `null` for both properties.
 *
 * @param {object} m The moment object to get the Unix time and natural date
 * from
 * @return {object} An object that contains a Unix time and its corresponding
 * natural date. If `m` is null, both values are also null.
 */
function createTimestampObject(m = null) {
  if (m) {
    return {
      unix: m.unix(),
      natural: m.format('MMMM D, YYYY'),
    };
  } else {
    return {
      unix: null,
      natural: null,
    };
  }
}

/**
 * Responds with a JSON that contains a Unix time and its corresponding natural
 * date from the request parameter. If the date input is malformed, the JSON
 * will contain null for both values.
 *
 * @param {object} req The request object
 * @param {object} res The response object
 */
function getTimestamp(req, res) {
  const {date} = req.params;
  let timestamp;
  let statusCode = 200;

  const fromUnix = moment.unix(date);
  const fromNatural
    = moment.utc(date, dateFormats, true);

  if (fromUnix.isValid()) {
    timestamp = createTimestampObject(fromUnix);
  } else if (fromNatural.isValid()) {
    timestamp = createTimestampObject(fromNatural);
  } else {
    timestamp = createTimestampObject();
    statusCode = 400;
  }

  res.status(statusCode).json(timestamp);
}

module.exports = {getTimestamp};
