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
      test.expect(7);
      test.notEqual(result, null);
      test.notEqual(result.data, null);
      test.equal(result.data.toString('base64'), "R0lGODdhAQABAIAAAMzMzJaWliwAAAAAAQABAAACAkQBADs=");
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
      test.expect(7);
      test.notEqual(result, null);
      test.notEqual(result.data, null);
      test.equal(result.data.toString('base64'), "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEXMzMyWlpYU2uzLAAAACklEQVQImWNgAAAAAgAB9HFkpgAAAABJRU5ErkJggg==");
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

exports['parseFromURI'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'failureFromURIHTTP01': function(test) {
    arykow.mime.parseFromURI('ht:tp://placehold.it/1x1').then(function(result) {
      test.expect(1);
      test.equal(result, null);
      test.done();
    }, function(error) {
      test.expect(3);
      test.notEqual(error, null);
      test.notEqual(error.message, null);
      test.equal(error.message, arykow.mime.errors.HTTP);
      test.done();
    });
  },
  'failureFromURIHTTP02': function(test) {
    arykow.mime.parseFromURI('http://google.fr/placehold.it/1x1').then(function(result) {
      test.expect(1);
      test.equal(result, null);
      test.done();
    }, function(error) {
      test.expect(3);
      test.notEqual(error, null);
      test.notEqual(error.message, null);
      test.equal(error.message, arykow.mime.errors.HTTP);
      test.done();
    });
  },
  'successFromURIGIF': function(test) {
    arykow.mime.parseFromURI('http://placehold.it/1x1.gif').then(function(result) {
      test.expect(7);
      test.notEqual(result, null);
      test.notEqual(result.data, null);
      test.equal(result.data.toString('base64'), "R0lGODdhAQABAIAAAMzMzJaWliwAAAAAAQABAAACAkQBADs=");
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
  'successFromURIPNG': function(test) {
    arykow.mime.parseFromURI('http://placehold.it/1x1.png').then(function(result) {
      test.expect(7);
      test.notEqual(result, null);
      test.notEqual(result.data, null);
      test.equal(result.data.toString('base64'), "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEXMzMyWlpYU2uzLAAAACklEQVQImWNgAAAAAgAB9HFkpgAAAABJRU5ErkJggg==");
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
