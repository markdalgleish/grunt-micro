'use strict';

var utils = require('../../tasks/lib/utils.js');

var generateStringOfLength = function(length) {
  var s = '';
  for (var i = 0; i < length; i ++) {
    s += 'a';
  }
  return s;
};

var halfMBFile, fullMBFile;

exports.exceedsLimit = {
  setUp: function(done) {
    halfMBFile = generateStringOfLength(512),
    fullMBFile = generateStringOfLength(1024);
    done();
  },
  "'exceedsLimit' is false if file is within size limit": function(test) {
    test.expect(1);

    utils.exceedsLimit(halfMBFile, 1000, false, function(err, results) {
      test.deepEqual(results, { size: halfMBFile.length, exceedsLimit: false });
      test.done();
    });
  },
  "'exceedsLimit' is true if file exceeds size limit": function(test) {
    test.expect(1);

    utils.exceedsLimit(halfMBFile, 500, false, function(err, results) {
      test.deepEqual(results, { size: halfMBFile.length, exceedsLimit: true });
      test.done();
    });
  },
  "'exceedsLimit' is false if Gzipped file is within size limit": function(test) {
    test.expect(2);

    utils.exceedsLimit(fullMBFile, 1000, true, function(err, results) {
      test.equal(results.exceedsLimit, false);
      test.notEqual(results.size, fullMBFile.length);
      test.done();
    });
  },
  "'exceedsLimit' is true if Gzipped file exceeds size limit": function(test) {
    test.expect(2);

    utils.exceedsLimit(fullMBFile, 1, true, function(err, results) {
      test.equal(results.exceedsLimit, true);
      test.notEqual(results.size, fullMBFile.length);

      test.done();
    });
  },
};
