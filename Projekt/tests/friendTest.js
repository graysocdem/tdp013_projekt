const assert = require('assert');
const request = require('supertest');
const app = require('../server/server.js');

describe('Friendship and Request', () => {
  it('should send a friend request', (done) => {
    request(app)
      .post('/MarkTest/request')
      .send({ owner: 'ElonTest', suitor: 'MarkTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should accept a friend request', (done) => {
    request(app)
      .patch('/accept')
      .send({ owner: 'MarkTest', suitor: 'ElonTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
