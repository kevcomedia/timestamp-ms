# timestamp-ms
freeCodeCamp timestamp microservice project

[![Build Status](https://travis-ci.org/kevcomedia/timestamp-ms.svg?branch=master)](https://travis-ci.org/kevcomedia/timestamp-ms)

## User stories

- I can pass a string as a parameter, and it will check to see whether that
string contains either a Unix timestamp or a natural language date (example:
January 1, 2016).
- If it does, it returns both the Unix timestamp and the natural language form
of the date.
- If it does not contain a date or Unix timestamp, it returns null for those
properties.

## Usage

- Natural Date
  - `/October 11, 2017`
- Unix Time
  - `/1507680000`

## Output

```json
{
  "unix": 1507680000,
  "natural": "October 11, 2017"
}
```
