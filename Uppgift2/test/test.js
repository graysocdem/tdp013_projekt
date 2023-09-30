const request = require('supertest');
const chai = require('chai');
const app = require('../server.js');
const expect = chai.expect;

describe('Messages API', () => {

  // Testing GET all messages
  it('should fetch all messages', (done) => {
    request(app)
      .get('/messages')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Testing POST a message

  it('should save a message', (done) => {

    const post = {
      author: "Emil Gummus",
      message: "Testar ett två ett två",
      timestamp: new Date().toISOString(),
      read: true
    }

    request(app)
      .post('/messages')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('should get Emil Gummus\'s post', (done) => {
    


  }) 

  // Add more tests for other endpoints
});