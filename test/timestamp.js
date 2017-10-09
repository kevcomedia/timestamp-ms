process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Timestamp', () => {
  let server;

  before(() => {
    server = app.listen(8888, () => {
      console.log('App is alive at port 8888 for testing.');
    });
  });

  after(() => server.close());

  describe('Proper output keys', () => {
    it('should return proper format for unix time input', (done) => {
      chai.request(server)
        .get('/0')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix');
          res.body.should.have.own.property('natural');
          done();
        });
    });

    it('should return proper format for natural date input', (done) => {
      chai.request(server)
        .get('/January 1, 1970')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix');
          res.body.should.have.own.property('natural');
          done();
        });
    });

    it('should return proper format for invalid input', (done) => {
      chai.request(server)
        .get('/invalid')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix');
          res.body.should.have.own.property('natural');
          done();
        });
    });
  });

  describe('Unix time input', () => {
    it('should accept negative Unix time', (done) => {
      chai.request(server)
        .get('/-100')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix').eql(-100);
          done();
        });
    });

    it('should truncate fractional Unix time', (done) => {
      chai.request(server)
        .get('/1.5')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix').eql(1);
          done();
        });
    });
  });

  describe('Natural date input', () => {
    const test = (done) => (err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.own.property('unix').eql(0);
      res.body.should.have.own.property('natural').eql('January 1, 1970');
      done();
    };

    it('should accept <Month Day Year> format', (done) => {
      chai.request(server)
        .get('/January 1 1970')
        .end(test(done));
    });

    it('should accept <Day Month Year> format', (done) => {
      chai.request(server)
        .get('/1 January 1970')
        .end(test(done));
    });

    it('should accept <Year Month Day> format', (done) => {
      chai.request(server)
        .get('/1970 January 1')
        .end(test(done));
    });

    it('should accept <Month Day Year> with short month names', (done) => {
      chai.request(server)
        .get('/Jan 1 1970')
        .end(test(done));
    });

    it('should accept <Day Month Year> with short month names', (done) => {
      chai.request(server)
        .get('/1 Jan 1970')
        .end(test(done));
    });

    it('should accept <Year Month Day> with short month names', (done) => {
      chai.request(server)
        .get('/1970 Jan 1')
        .end(test(done));
    });
  });

  describe('Invalid input', () => {
    it('should treat non-date formats as invalid', (done) => {
      chai.request(server)
        .get('/a')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix').to.be.null;
          res.body.should.have.own.property('natural').to.be.null;
          done();
        });
    });

    it('should treat unsafe integers as invalid', (done) => {
      chai.request(server)
        .get('/9007199254740992')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.own.property('unix').to.be.null;
          res.body.should.have.own.property('natural').to.be.null;
          done();
        });
    });
  });
});
