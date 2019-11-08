'use strict';

var should = require('chai').should();
var expect = require('chai').expect;

var auroracoin = require('..');
var errors = auroracoin.errors;
var Unit = auroracoin.Unit;

describe('Unit', function() {

  it('can be created from a number and unit', function() {
    expect(function() {
      return new Unit(1.2, 'AUR');
    }).to.not.throw();
  });

  it('can be created from a number and exchange rate', function() {
    expect(function() {
      return new Unit(1.2, 350);
    }).to.not.throw();
  });

  it('no "new" is required for creating an instance', function() {
    expect(function() {
      return Unit(1.2, 'AUR');
    }).to.not.throw();

    expect(function() {
      return Unit(1.2, 350);
    }).to.not.throw();
  });

  it('has property accesors "AUR", "mAUR", "uAUR", "bits", and "satoshis"', function() {
    var unit = new Unit(1.2, 'AUR');
    unit.AUR.should.equal(1.2);
    unit.mAUR.should.equal(1200);
    unit.uAUR.should.equal(1200000);
    unit.bits.should.equal(1200000);
    unit.satoshis.should.equal(120000000);
  });

  it('a string amount is allowed', function() {
    var unit;

    unit = Unit.fromAUR('1.00001');
    unit.AUR.should.equal(1.00001);

    unit = Unit.fromMilis('1.00001');
    unit.mAUR.should.equal(1.00001);

    unit = Unit.fromMillis('1.00001');
    unit.mAUR.should.equal(1.00001);

    unit = Unit.fromBits('100');
    unit.bits.should.equal(100);

    unit = Unit.fromSatoshis('8999');
    unit.satoshis.should.equal(8999);

    unit = Unit.fromFiat('43', 350);
    unit.AUR.should.equal(0.12285714);
  });

  it('should have constructor helpers', function() {
    var unit;

    unit = Unit.fromAUR(1.00001);
    unit.AUR.should.equal(1.00001);

    unit = Unit.fromMilis(1.00001);
    unit.mAUR.should.equal(1.00001);

    unit = Unit.fromBits(100);
    unit.bits.should.equal(100);

    unit = Unit.fromSatoshis(8999);
    unit.satoshis.should.equal(8999);

    unit = Unit.fromFiat(43, 350);
    unit.AUR.should.equal(0.12285714);
  });

  it('converts to satoshis correctly', function() {
    /* jshint maxstatements: 25 */
    var unit;

    unit = Unit.fromAUR(1.3);
    unit.mAUR.should.equal(1300);
    unit.bits.should.equal(1300000);
    unit.satoshis.should.equal(130000000);

    unit = Unit.fromMilis(1.3);
    unit.AUR.should.equal(0.0013);
    unit.bits.should.equal(1300);
    unit.satoshis.should.equal(130000);

    unit = Unit.fromBits(1.3);
    unit.AUR.should.equal(0.0000013);
    unit.mAUR.should.equal(0.0013);
    unit.satoshis.should.equal(130);

    unit = Unit.fromSatoshis(3);
    unit.AUR.should.equal(0.00000003);
    unit.mAUR.should.equal(0.00003);
    unit.bits.should.equal(0.03);
  });

  it('takes into account floating point problems', function() {
    var unit = Unit.fromAUR(0.00000003);
    unit.mAUR.should.equal(0.00003);
    unit.bits.should.equal(0.03);
    unit.satoshis.should.equal(3);
  });

  it('exposes unit codes', function() {
    should.exist(Unit.AUR);
    Unit.AUR.should.equal('AUR');

    should.exist(Unit.mAUR);
    Unit.mAUR.should.equal('mAUR');

    should.exist(Unit.bits);
    Unit.bits.should.equal('bits');

    should.exist(Unit.satoshis);
    Unit.satoshis.should.equal('satoshis');
  });

  it('exposes a method that converts to different units', function() {
    var unit = new Unit(1.3, 'AUR');
    unit.to(Unit.AUR).should.equal(unit.AUR);
    unit.to(Unit.mAUR).should.equal(unit.mAUR);
    unit.to(Unit.bits).should.equal(unit.bits);
    unit.to(Unit.satoshis).should.equal(unit.satoshis);
  });

  it('exposes shorthand conversion methods', function() {
    var unit = new Unit(1.3, 'AUR');
    unit.toAUR().should.equal(unit.AUR);
    unit.toMilis().should.equal(unit.mAUR);
    unit.toMillis().should.equal(unit.mAUR);
    unit.toBits().should.equal(unit.bits);
    unit.toSatoshis().should.equal(unit.satoshis);
  });

  it('can convert to fiat', function() {
    var unit = new Unit(1.3, 350);
    unit.atRate(350).should.equal(1.3);
    unit.to(350).should.equal(1.3);

    unit = Unit.fromAUR(0.0123);
    unit.atRate(10).should.equal(0.12);
  });

  it('toString works as expected', function() {
    var unit = new Unit(1.3, 'AUR');
    should.exist(unit.toString);
    unit.toString().should.be.a('string');
  });

  it('can be imported and exported from/to JSON', function() {
    var json = JSON.stringify({amount:1.3, code:'AUR'});
    var unit = Unit.fromObject(JSON.parse(json));
    JSON.stringify(unit).should.deep.equal(json);
  });

  it('importing from invalid JSON fails quickly', function() {
    expect(function() {
      return Unit.fromJSON('¹');
    }).to.throw();
  });

  it('inspect method displays nicely', function() {
    var unit = new Unit(1.3, 'AUR');
    unit.inspect().should.equal('<Unit: 130000000 satoshis>');
  });

  it('fails when the unit is not recognized', function() {
    expect(function() {
      return new Unit(100, 'USD');
    }).to.throw(errors.Unit.UnknownCode);
    expect(function() {
      return new Unit(100, 'AUR').to('USD');
    }).to.throw(errors.Unit.UnknownCode);
  });

  it('fails when the exchange rate is invalid', function() {
    expect(function() {
      return new Unit(100, -123);
    }).to.throw(errors.Unit.InvalidRate);
    expect(function() {
      return new Unit(100, 'AUR').atRate(-123);
    }).to.throw(errors.Unit.InvalidRate);
  });

});
