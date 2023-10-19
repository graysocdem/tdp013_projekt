const assert = require('assert');
const request = require('supertest');
const { httpApp, httpsApp} = require('../server/server.js');
require("./userTest.js")

describe('Page and Post Operations', () => {
  it('should create a new post on a user\'s page', (done) => {
    request(httpApp)
      .post('/post')
      .set('x-access-token', token)
      .send({ owner: 'ElonTest', user: 'ElonTest', message: 'We wil change x back to twitter boys', timestamp: '2023-10-15' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  
  it('should retrieve posts from a user\'s page', (done) => {
    request(httpApp)
      .get('/page/ElonTest')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(Object.keys(JSON.toString(res)).length !== 0, 'Response should be an array of posts');
        done();
      });
  });
});
