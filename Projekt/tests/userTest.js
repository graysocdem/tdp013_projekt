/*
Session-tester
Friend request-knappen - avkodifiera
Livechatt
*/

const assert = require('assert');
const request = require('supertest');
const bcrypt = require('bcryptjs')
const { httpApp, httpsApp } = require('../server/server.js'); 
const mongoose = require('mongoose');
const User = require('../server/models/User.js');
const Post = require('../server/models/Post.js');
const Page = require('../server/models/Page.js');

mongoose.connect('mongodb://localhost:27017/facer')

// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// res.setHeader('Cross-origin-Embedder-Policy', 'require-corp');
// res.setHeader('Cross-origin-Opener-Policy', 'same-origin');

before(async () => {
  await User.deleteMany({})
  await Post.deleteMany({})
  await Page.deleteMany({})
})

let token = ""
describe('User Registration and Authentication', () => {
  it('should register a new user', function(done) {
    request(httpApp)
      .post('/user')
      .send({ username: 'ElonTest', password: bcrypt.hashSync('ElonSecret123', 10) })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.response, 'User created');
        done();
      });
  });

  it('should fail to register a user with an existing username', (done) => {
    request(httpApp)
      .post('/user')
      .send({ username: 'ElonTest', password: 'ElonSecret123' })
      .expect(409)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should log in an existing user', (done) => {
    request(httpsApp)
      .post('/login')
      .send({ username: 'ElonTest', password: 'ElonSecret123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.username, 'ElonTest');
        assert(res.body.token !== null)
        token = res.body.token
        done();
      });
  });

  it('should fail to log in with incorrect credentials', (done) => {
    request(httpsApp)
      .post('/login')
      .send({ username: 'ElonTest', password: bcrypt.hashSync('ElonTruth123', 10)})
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should get all users', (done) => {
    request(httpApp)
      .get('/users')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(Array.isArray(res.body), 'Response should be an array of users')
        assert(res.body.length > 0, "User amount should be over 0")
        done()
      }) 
  })
});