'use strict';

var should = require('chai').should();
var auroracoin = require('../');

describe('#versionGuard', function() {
  it('global._auroracoin should be defined', function() {
    should.equal(global._auroracoin, auroracoin.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      auroracoin.versionGuard('version');
    }).should.throw('More than one instance of auroracoin');
  });
});
