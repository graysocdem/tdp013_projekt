const request = require('supertest');
const chai = require('chai');
const app = require('../server.js');
const expect = chai.expect;

describe('Messages API', () => {

  // Testing GET all messages
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

//--------------------------------------------------------------------------------------------------------------------------
  // Updating Message Read Status
  it('should update the read status of a message', function(done) {
  const MessageId = '651aed1ea3295378a20cd8a0';
  request(app)
      .patch(`/messages/${MessageId}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(["\"post marked as unread\"", "\"post marked as read\""]).to.include(res.text);

          done();
      });
  });
  
  // Updating Message Read Status
  it('should update the read status of a message', function(done) {
    const MessageId = '651aed1ea3295378a20cd8a0';
    request(app)
        .patch(`/messages/${MessageId}`)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(["\"post marked as unread\"", "\"post marked as read\""]).to.include(res.text);
  
            done();
        });
    });

//--------------------------------------------------------------------------------------------------------------------------
 
  // Fetching Specific Message
  it('should fetch a specific message with its ID', function(done) {
  const MessageId = '651aed1ea3295378a20cd8a0';

  request(app)
      .get(`/messages/${MessageId}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id', MessageId);
          done();
      });
  });

  // Handling Invalid Parameters on POST:
  it('should not save a message with invalid parameters', function(done) {
    const invalidPost = {
       author: "",
       message: "WeeWooo",
       timestamp: new Date().toISOString(),
       read: true
    }
    request(app)
       .post('/messages')
       .send(invalidPost)
       .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
       });
  });


  // Updating with Invalid ID
  it('should not update a post with an invalid ID', function(done) {
    const invalidId = 'weewoo';
    request(app)
       .patch(`/messages/${invalidId}`)
       .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
       });
  });

  // Handling DELETE Request
  it('should return 405 Method Not Allowed for weird requests', function(done) {
    request(app)
       .delete('/messages')
       .end((err, res) => {
          expect(res.status).to.equal(405);
          done();
       });
  });

  // Handling Unsupported Method (PUT)
  it('should return 405 Method Not Allowed when using an unsupported method', function(done) {
    const nonExistentId = 'noway';
    request(app)
       .put(`/messages/${nonExistentId}`)
       .end((err, res) => {
          expect(res.status).to.equal(405);
          expect(res.text).to.equal("Method Not Allowed");
          done();
       });
  });
});

// GET Request with Non-existent ID
describe('GET /messages/:id', () => {

  it('should return 400 for an invalid post ID', function(done) {
    
    const invalidId = 'invalid123';

    request(app)
      .get(`/messages/${invalidId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});

// GET Request with Invalid ID
describe('GET /messages/:id', () => {

  it('should return 400 for an invalid post ID', function(done) {
    
    const invalidId = '¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥';

    request(app)
      .get(`/messages/${invalidId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
