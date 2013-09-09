[![Build Status](https://secure.travis-ci.org/markdalgleish/grunt-micro.png)](http://travis-ci.org/markdalgleish/grunt-micro)

# grunt-micro

#### Ensure your micro-framework stays micro.

Does your project page say `Less than xKB min'd and Gzipped`? Make the build fail if you're lying.

Grunt-micro is particularly useful when paired with [TravisCI](http://about.travis-ci.org/docs/user/getting-started/) to verify all pull requests are within your specified size limit.

By default, grunt-micro is configured to ensure eligibility for [microjs.com](http://microjs.com) (5KB Gzipped and under).

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-micro --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-micro');
```

## The "micro" task

### Overview
In your project's Gruntfile, add a section named `micro` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  micro: {
    options: {
      // Task-specific options go here.
    },
    my_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### options.limit
Type: `Number`
Default value: `5120` (5KB)

File size limit in bytes.

#### options.gzip
Type: `Boolean`
Default value: `true`

Gzip files before size calculation.

### Usage Examples

#### Standard Usage

Configure the size limit and Gzip settings for your files.

```js
grunt.initConfig({
  micro: {
    my_target: {
      src: 'dist/project.min.js',
      options: {
        limit: 1024,
        gzip: false
      }
    }
  }
});
```
#### MicroJS Projects

By default, grunt-micro is configured to ensure eligibility for [microjs.com](http://microjs.com) (5KB Gzipped and under).

```js
grunt.initConfig({
  micro: {
    my_target: {
      src: 'dist/project.min.js'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org
