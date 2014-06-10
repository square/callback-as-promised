var callbackAsPromised = require('../index'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    Promise = require('promise'),
    sinon = require('sinon'),
    expect = chai.expect;

chai.use(chaiAsPromised);

var doSomethingAsync = callbackAsPromised(function(successful) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (successful) {
        resolve('very successful');
      } else {
        reject(new Error("wasn't successful"));
      }
    }, 500);
  });
});

describe('callback-as-promised', function() {

  describe('with a callback passed', function() {
    var _callback, callback;

    describe('and success', function() {
      before(function(done) {
        _callback = function(err, value) { done(); };
        callback = sinon.spy(_callback);
        doSomethingAsync(true, callback);
      });

      it('calls callback(null, successValue)', function() {
        expect(callback.called).to.be.ok;
        expect(callback.args[0][0]).to.not.exist;
        expect(callback.args[0][1]).to.equal('very successful');
      });
    });

    describe('and error', function() {
      var _callback, callback;

      before(function(done) {
        _callback = function(err, value) { done(); };
        callback = sinon.spy(_callback);
        doSomethingAsync(false, callback);
      });

      it('calls callback(error, null)', function() {
        expect(callback.called).to.be.ok;
        expect(callback.args[0][0]).to.be.an.instanceOf(Error);
        expect(callback.args[0][1]).to.not.exist;
      });
    });
  });

  describe('without a callback passed', function() {
    describe('and success', function() {
      it('returns an eventually fulfilled promise', function(done) {
        expect(doSomethingAsync(true)).to.eventually.be.fulfilled
        .and.equal('very successful')
        .and.notify(done);
      });
    });

    describe('and error', function() {
      it('returns an eventually rejected promise', function(done) {
        expect(doSomethingAsync(false)).to.eventually.be.rejected
        .and.be.a.instanceOf(Error)
        .and.notify(done);
      });
    });
  });
});
