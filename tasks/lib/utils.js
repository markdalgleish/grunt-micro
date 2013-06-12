'use strict';

var zlib = require('zlib');

module.exports = {
	exceedsLimit: function(contents, limit, isGzip, callback) {
		zlib.gzip(contents, function(err, results) {
			var size = (isGzip ? results.length : contents.length);

			callback(err, results = {
				size: size,
				exceedsLimit: size > limit
			});
		});
	}
};