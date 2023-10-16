const assert = require('assert');
const request = require('supertest');
const app = require('../server/server.js');

describe('Page and Post Operations', () => {
  it('should create a new post on a user\'s page', (done) => {
    request(app)
      .post('/post')
      .send({ owner: 'ElonTest', user: 'ElonTest', message: 'We wil change x back to twitter boys', timestamp: '2023-10-15' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should retrieve posts from a user\'s page', (done) => {
    request(app)
      .get('/page/ElonTest')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(Array.isArray(res.body), 'Response should be an array of posts');
        done();
      });
  });
});
