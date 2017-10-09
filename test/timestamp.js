process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Timestamp', () => {
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
});
