const assert = require('assert');
const request = require('supertest');
const { httpApp, httpsApp} = require('../server/server.js');
require("./userTest.js")

describe('Friendship and Request', () => {
  it('should send a friend request', (done) => {
    request(httpApp)
      .post('/MarkTest/request')
      .set('x-access-token', token)
      .send({ owner: 'ElonTest', suitor: 'MarkTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should accept a friend request', (done) => {
    request(httpApp)
      .patch('/accept')
      .set('x-access-token', token)
      .send({ owner: 'MarkTest', suitor: 'ElonTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
