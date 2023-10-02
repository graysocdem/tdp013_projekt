const request = require('supertest');
const chai = require('chai');
const app = require('../server.js');
const expect = chai.expect;

describe('Messages API', () => {

  //Testing GET all messages
  it('should fetch all messages', function(done)  {
    request(app)
    
      .get('/messages')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Testing POST a message

  it('should save a message', function(done)  {
    
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

  
  it('should update the read status of a message', function(done) {
  const MessageId = '651ab430498114e639e12d27';
  request(app)
      .patch(`/messages/${MessageId}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(["\"post marked as unread\"", "\"post marked as read\""]).to.include(res.text);

          done();
      });
  });

 
  it('should fetch a specific message with its ID', function(done) {
  const MessageId = '651ab430498114e639e12d27';

  request(app)
      .get(`/messages/${MessageId}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id', MessageId);
          done();
      });
  });


});