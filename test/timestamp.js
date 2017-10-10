process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Timestamp', () => {
  let server;

  before(() => {
    server = app.listen(8888);
  });

  after(() => server.close());

  describe('Proper output keys', () => {
    const inputs = [
      {
        label: 'should return proper format for unix time input',
        route: '/0',
      },
      {
        label: 'should return proper format for natural date input',
        route: '/January 1, 1970',
      },
      {
        label: 'should return proper format for invalid input',
        route: '/invalid',
        expectedStatusCode: 400
      }
    ];

    const end = (done, code = 200) => (err, res) => {
      res.should.have.status(code);
      res.body.should.be.an('object').that.has.all.own.keys('unix', 'natural');
      done();
    };

    inputs.forEach(({label, route, expectedStatusCode}) => {
      it(label, (done) => {
        chai.request(server)
          .get(route)
          .end(end(done, expectedStatusCode));
      });
    });
  });

  describe('Unix time input', () => {
    const inputs = [
      {
        label: 'should accept negative Unix time',
        route: '/-100',
        expectedUnixTime: -100
      },
      {
        label: 'should truncate fractional Unix time',
        route: '/1.5',
        expectedUnixTime: 1
      }
    ];

    const end = (done, expectedUnixTime) => (err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object').that.has.property('unix').equal(expectedUnixTime);
      done();
    };

    inputs.forEach(({label, route, expectedUnixTime}) => {
      it(label, (done) => {
        chai.request(server)
          .get(route)
          .end(end(done, expectedUnixTime));
      });
    });
  });

  describe('Natural date input', () => {
    const inputs = [
      {
        label: 'should accept <Month Day Year> format',
        route: '/January 1 1970'
      },
      {
        label: 'should accept <Day Month Year> format',
        route: '/1 January 1970'
      },
      {
        label: 'should accept <Year Month Day> format',
        route: '/1970 January 1'
      },
      {
        label: 'should accept <Month Day Year> format with short month names',
        route: '/Jan 1 1970'
      },
      {
        label: 'should accept <Day Month Year> format with short month names',
        route: '/1 Jan 1970'
      },
      {
        label: 'should accept <Year Month Day> format with short month names',
        route: '/1970 Jan 1'
      },
    ];

    const end = (done) => (err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('unix').equal(0);
      res.body.should.have.property('natural').equal('January 1, 1970');
      done();
    };

    inputs.forEach(({label, route}) => {
      it(label, (done) => {
        chai.request(server)
          .get(route)
          .end(end(done));
      });
    });
  });

  describe('Invalid input', () => {
    const inputs = [
      {
        label: 'should treat non-date formats as invalid',
        route: '/a'
      },
      {
        label: 'should treat unsafe integers as invalid',
        route: '/9007199254740992'
      }
    ];

    const end = (done) => (err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.property('unix').that.is.null;
      res.body.should.have.property('natural').that.is.null;
      done();
    };

    inputs.forEach(({label, route}) => {
      it(label, (done) => {
        chai.request(server)
          .get(route)
          .end(end(done));
      });
    });
  });
});
