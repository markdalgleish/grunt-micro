/*
 * grunt-limit
 * https://github.com/markdalgleish/grunt-limit
 *
 * Copyright (c) 2013 Mark Dalgleish
 * Licensed under the MIT license.
 */

'use strict';

var q = require('q'),
  utils = require('./lib/utils.js');

module.exports = function(grunt) {

  grunt.registerMultiTask('micro', 'Ensure files are within specified size limits.', function() {
    var done = this.async();

    var fileCount = 0,
      hasErrors = false,
      targetLimit,
      targetGzipped,
      promises = [];

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      limit: 5 * 1024,
      gzip: true
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          fileCount++;
          return true;
        }
      }).forEach(function(filepath) {
        var deferred = q.defer(),
          contents = grunt.file.read(filepath),
          limit = (f.limit !== undefined ? f.limit : options.limit),
          gzip = (f.gzip !== undefined ? f.gzip : options.gzip);

        targetLimit = limit;
        targetGzipped = gzip;

        utils.exceedsLimit(contents, limit, gzip, function(err, results) {
          var log = grunt.log[results.exceedsLimit ? 'error' : 'ok'];

          log('File "' + filepath + '" (' + results.size + ' bytes' + (gzip ? ' Gzipped' : '') + ') ' +
            (results.exceedsLimit ?
              'exceeds limit of ' + limit + ' bytes by ' + (results.size - limit) + ' bytes.' :
              'is within limit of ' + limit + ' bytes.'));

          if (results.exceedsLimit) {
            deferred.reject();
          } else {
            deferred.resolve();
          }
        });

        promises.push(deferred.promise);
      });
    });

    q.all(promises).then(function() {
      done(true);
    }, function() {
      done(false);
    });
  });

};
