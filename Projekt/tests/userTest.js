const assert = require('assert');
const request = require('supertest');
const app = require('../server/server.js'); 

describe('User Registration and Authentication', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/user')
      .send({ username: 'ElonTest', password: 'ElonSecret123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.response, 'User created');
        done();
      });
  });

  it('should fail to register a user with an existing username', (done) => {
    request(app)
      .post('/user')
      .send({ username: 'ElonTest', password: 'ElonSecret123' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should log in an existing user', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'ElonTest', password: 'ElonSecret123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.username, 'testuser');
        done();
      });
  });

  it('should fail to log in with incorrect credentials', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'ElonTest', password: 'ElonTruth123' })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
