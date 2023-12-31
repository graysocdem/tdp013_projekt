const request = require('supertest');
const chai = require('chai');
const app = require('../server.js');
const expect = chai.expect;

describe('Messages API', () => {



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

  // Testing POST a message

  it('should fail to save a post with an overly large message', function(done)  {
    
    const post = {
      author: "Emil Gummus",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat. hej jag heter oskar",
      timestamp: new Date().toISOString(),
      read: true
    }

    request(app)
      .post('/messages')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(413)
        done()
      })
  })

  it('should fail to save a post with an empty message', function(done)  {
    
    const post = {
      author: "Emil Gummus",
      message: "",
      timestamp: new Date().toISOString(),
      read: true
    }

    request(app)
      .post('/messages')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  let sampleID;
  //Testing GET all messages
  it('should fetch all messages', function(done)  {
    request(app)
    
      .get('/messages')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        sampleID = res.body[0]._id
        done();
      });
  });

  // Testing bogus URL

  it('should attempt and fail to access a bogus URL', function(done)  {

    request(app)
      .get('/ankeborg')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })

//--------------------------------------------------------------------------------------------------------------------------

  it('should update the read status of a message', function(done) {
  //const MessageId = '651aed1ea3295378a20cd8a0';
  request(app)
      .patch(`/messages/${sampleID}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(["\"Post marked as unread.\"", "\"Post marked as read.\""]).to.include(res.text);

          done();
      });
  });
  
  it('should update the read status of a message', function(done) {
    //const MessageId = '651aed1ea3295378a20cd8a0';
    request(app)
        .patch(`/messages/${sampleID}`)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(["\"Post marked as unread.\"", "\"Post marked as read.\""]).to.include(res.text);
  
            done();
        });
    });

//--------------------------------------------------------------------------------------------------------------------------
 
  it('should fetch a specific message with its ID', function(done) {

  request(app)
      .get(`/messages/${sampleID}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id', sampleID);
          done();
      });
  });


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


  
  it('should not update a post with an invalid ID', function(done) {
    const invalidId = 'weewoo';
    request(app)
       .patch(`/messages/${invalidId}`)
       .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
       });
  });


  it('should return 405 Method Not Allowed for weird requests', function(done) {
    request(app)
       .delete('/messages')
       .end((err, res) => {
          expect(res.status).to.equal(405);
          done();
       });
  });


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

// PATCH Request with Invalid ID
describe('PATCH /messages/:id', () => {

  it('should return 400 for a post ID with invalid character', function(done) {
    
    const invalidId = '¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥';

    request(app)
      .patch(`/messages/${invalidId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('CORS headers', () => {
  it('should be set correctly', (done) => {
    request(app)
      .get('/messages')
      .end((err, res) => {
        expect(res.headers['access-control-allow-origin']).to.equal('http://localhost:5500');
        done(err);
      });
  });
});