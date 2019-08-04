'use strict';
const assert = require('assert');
const req = require('req-fast');
const _ = require('lodash');
const db = 'hashflux';

describe('HTTP', () => {



  it('ping backend', done => {
    req({ method: 'GET', url: 'localhost:8086/ping' }, (err, res) => {
      if(err) { done(err); return }
      assert.equal(res.status, 204);
      assert(res.get('X-Influxdb-Version'));
      done();
    })
  });

  it('create database by post', done => {
    req({ method: 'POST', url: 'localhost:8086', data: {  q: `create database ${db}` } }, (err, res) => {
      if(err) { done(err); return }
      assert(!_.isEmpty(res.body));
      done();
    })
  });

  it('post data to backend', done => {
    req({ method: 'POST', url: 'localhost:8086/write', data: 'cpu_load_short,host=server01,region=us-west value=0.64' }, (err, res) => {
      if(err) { done(err); return }
      done();
    })
  });

  it('drop db', function(done) {
    this.timeout(5000);
    req({ method: 'POST', url: 'localhost:8086/query', data: { q: `drop database ${db}`} }, (err, res) => {
      if(err) { done(err); return }
      assert(!_.isEmpty(res.body));
      done();
    })
  });

});
