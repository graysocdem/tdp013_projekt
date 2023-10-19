const assert = require('assert');
const request = require('supertest');
const { httpApp, httpsApp} = require('../server/server.js');
require("./userTest.js")

describe('Access attempts with expired tokens', () => {
  it('Should not be allowed to get user', (done) => {
    request(httpApp)
      .post('/user/ElonTest')
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE2OTc3MTA5NzIsImV4cCI6MTY5NzcxNDU3Mn0.qeXlU_s06KwnY1NHRUu_G_VZwR4LP-TV6MTeLgykGBw")
      .send({ owner: 'ElonTest', user: 'ElonTest', message: 'We wil change x back to twitter boys', timestamp: '2023-10-15' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

});
