'use strict';

var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('user creation page', function () {
  before(function (done) {
      require('../../models').sequelize.sync();
      done();
  });
  
  beforeEach(function (done) {
    this.models = require('../../models');

    Bluebird.all([
      this.models.Tasks.truncate({cascade: true}),
      this.models.Users.truncate({cascade: true})
    ]);

    done();
  });

  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });

  it('lists a user if there is one', function (done) {
    this.models.Users.create({ username: 'johndoe' }).then(function () {
      request(app).get('/').expect(/johndoe/, done);
    })
  });

  it('lists the tickets for the user if available', function (done) {
    this.models.Users.create({ username: 'johndoe' }).bind(this).then(function (user) {
      return this.models.Tasks.create({ title: 'johndoe task', UserId: user.id });
    }).then(function () {
      request(app).get('/').expect(/johndoe task/, done);
    });
  });
});
