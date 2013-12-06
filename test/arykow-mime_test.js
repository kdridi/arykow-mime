'use strict';

var arykow = {
  mime: require('../lib/arykow-mime.js')
};

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['parseFromBuffer'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'failureFromBufferNULL': function(test) {
    arykow.mime.parseFromBuffer(null).then(function(result) {
      test.expect(1);
      test.equal(result, null);
      test.done();
    }, function(error) {
      test.expect(3);
      test.notEqual(error, null);
      test.notEqual(error.message, null);
      test.equal(error.message, arykow.mime.errors.NULL);
      test.done();
    });
  },
};

exports['parseFromFile'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'failureFromFileFSERR': function(test) {
    arykow.mime.parseFromFile('test/data/01.not.file').then(function(result) {
      test.expect(1);
      test.equal(result, null);
      test.done();
    }, function(error) {
      test.expect(3);
      test.notEqual(error, null);
      test.notEqual(error.message, null);
      test.equal(error.message, arykow.mime.errors.FSERR);
      test.done();
    });
  },
  'failureFromFileINVALID': function(test) {
    arykow.mime.parseFromFile('test/data/01.txt').then(function(result) {
      test.expect(1);
      test.equal(result, null);
      test.done();
    }, function(error) {
      test.expect(3);
      test.notEqual(error, null);
      test.notEqual(error.message, null);
      test.equal(error.message, arykow.mime.errors.INVALID);
      test.done();
    });
  },
  'successFromFileGIF': function(test) {
    arykow.mime.parseFromFile('test/data/01.gif').then(function(result) {
      test.expect(5);
      test.notEqual(result, null);
      test.notEqual(result.name, null);
      test.equal(result.name, 'image/gif');
      test.notEqual(result.extension, null);
      test.equal(result.extension, 'gif');
      test.done();
    }, function(error) {
      test.expect(1);
      test.equal(error, null);
      test.done();
    });
  },
  'successFromFilePNG': function(test) {
    arykow.mime.parseFromFile('test/data/01.png').then(function(result) {
      test.expect(5);
      test.notEqual(result, null);
      test.notEqual(result.name, null);
      test.equal(result.name, 'image/png');
      test.notEqual(result.extension, null);
      test.equal(result.extension, 'png');
      test.done();
    }, function(error) {
      test.expect(1);
      test.equal(error, null);
      test.done();
    });
  },
};
