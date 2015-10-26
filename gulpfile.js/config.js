var dest = "./build";
var src = "./src";
var vendorSrc = src + '/vendor';
var bowerSrc = './bower_components';
var staticHost = 'gulp-starter.dev';

var nib = require('nib');

module.exports = {
  general: {
    dest: dest,
    src: src,
    root: './'
  },
  browserSync: {
    proxy: staticHost,
    open: false,
    ghostMode: false
  },
  styles: {
    src: [
      src + "/assets/styles/*.styl",
      src + "/modules/**/*.styl",
    ],
    dest: dest + "/assets/styles",
    settings: {
      use: nib(),
      compress: true,
      'include css': true
    }
  },
  bootstrap: {
    src: src + "/assets/styles/bootstrap.scss",
    settings: {
      includePaths: [
        bowerSrc + '/bootstrap-sass/assets/stylesheets'
      ]
    },
    dest: vendorSrc,
  },
  images: {
    src: src + "/assets/images/**",
    dest: dest + "/assets/images"
  },
  templates: {
    dataPath: src + '/data',
    dataFiles: ['global'],
    HTML: {
      src: [src + "/templates/**/*.jade",
      "!" + src + "/templates/**/*.php.jade",
      "!" + src + "/templates/includes/**/*.jade"],
      dest: dest
    },
    PHP: {
      src: src + "/templates/**/*.php.jade",
      dest: dest
    },
  },
  copy: {
    base: {
      src: [
        src + "/static/**/*.*"
      ],
      dest: dest
    }
  },
  browserify: {
    debug: true,
    bundleConfigs: [
      {
        entries: src + "/assets/scripts/app.coffee",
        dest: dest + "/assets/scripts",
        outputName: "app.js",
        extensions: [".coffee"]
      }
    ]
  },
  concat: {
    headJS: {
      src: [
        bowerSrc + '/modernizr/modernizr.js',
        bowerSrc + '/respond/dest/respond.min.js'
      ],
      name: 'head.js',
      dest: dest + '/assets/scripts/'
    },
    vendorJS: {
      src: [
        bowerSrc + '/jquery/dist/jquery.min.js'
      ],
      name: 'vendor.js',
      dest: dest + '/assets/scripts/'
    },
    vendorCSS: {
      src: [
        vendorSrc + '/bootstrap.css'
      ],
      name: 'vendor.css',
      dest: dest + '/assets/styles'
    }
  },
  coffeelint: {
    src: src + '/assets/scripts/**/*.coffee'
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  },
  clean: dest,
  rev: {
    src: dest + '/**/*.*',
    settings: {
      dontRenameFile: ['.php', '.md', '.json', '/favicon.ico', '/favicon.png', '/apple-touch-icon-180x180.png', '/apple-touch-icon.png', '.woff', '.ttf', '.svg', '.eot', '.otf', '.htc'],
      dontUpdateReference: ['.php', '.md', '.json', '/favicon.ico', '/favicon.png', '/apple-touch-icon-180x180.png', '/apple-touch-icon.png', '.woff', '.ttf', '.svg', '.eot', '.otf', '.htc'],
      dontSearchFile: ['vendor.js']
    },
    dest: dest
  }
};
