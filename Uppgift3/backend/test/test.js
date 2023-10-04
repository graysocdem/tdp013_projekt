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

//--------------------------------------------------------------------------------------------------------------------------

  // it('should update the read status of a message', function(done) {
  // const MessageId = '651a8cb2ac8687fd6a96429f';
  // request(app)
  //     .patch(`/messages/${MessageId}`)
  //     .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(["\"post marked as unread\"", "\"post marked as read\""]).to.include(res.text);

  //         done();
  //     });
  // });
  
  // it('should update the read status of a message', function(done) {
  //   const MessageId = '651a8cb2ac8687fd6a96429f';
  //   request(app)
  //       .patch(`/messages/${MessageId}`)
  //       .end((err, res) => {
  //           expect(res.status).to.equal(200);
  //           expect(["\"post marked as unread\"", "\"post marked as read\""]).to.include(res.text);
  
  //           done();
  //       });
  //   });

//--------------------------------------------------------------------------------------------------------------------------
 
  it('should fetch a specific message with its ID', function(done) {
  const MessageId = '651a8ae4e0ec1c07b854ed61';

  request(app)
      .get(`/messages/${MessageId}`)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id', MessageId);
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

