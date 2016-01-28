var publicPath = '';
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
    root: './',
    publicPath: publicPath + '/'
  },
  browserSync: {
    proxy: staticHost,
    open: false,
    ghostMode: false
  },
  // styles: {
  //   src: [
  //     src + "/assets/styles/*.styl",
  //     src + "/modules/**/*.styl",
  //   ],
  //   dest: dest + "/assets/styles",
  //   settings: {
  //     use: nib(),
  //     compress: true,
  //     'include css': true
  //   }
  // },
  bootstrap: {
    src: [
      src + "/assets/styles/bootstrap.scss"
    ],
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
  data: {
    src: [
      src + "/content/**/index.cson"
    ],
    dest: dest
  },
  copy: {
    base: {
      src: [
        src + "/static/**/*.*"
      ],
      dest: dest
    },
    modules: {
      src: [
        src + "/content/**/*.*",
        "!" + src + "/content/**/*.cson"
      ],
      base: src + '/content',
      dest: dest + '/content'
    },
    mediaelement: {
      src: [
        bowerSrc + "/mediaelement/build/flashmediaelement.swf",
        bowerSrc + "/mediaelement/build/silverlightmediaelement.xap"
      ],
      dest: dest + "/assets/swf"
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
        bowerSrc + '/html5shiv/dist/html5shiv.min.js',
        bowerSrc + '/respond/dest/respond.min.js',
        bowerSrc + '/modernizr/modernizr.js'
      ],
      name: 'head.js',
      dest: dest + '/assets/scripts/'
    },
    vendorJS: {
      src: [
        vendorSrc + '/trim.js',
        vendorSrc + '/objectKeys.js',
        bowerSrc + '/jquery/dist/jquery.min.js',
        bowerSrc + '/df-visible/jquery.visible.min.js',
        bowerSrc + '/flexslider/jquery.flexslider.js',
        bowerSrc + '/mediaelement/build/mediaelement-and-player.min.js',
        bowerSrc + '/picturefill/dist/picturefill.js',
        bowerSrc + '/jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js',
        bowerSrc + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        bowerSrc + '/js-cookie/src/js.cookie.js',
        bowerSrc + '/browserdetection/src/browser-detection.js',
        vendorSrc + '/polyfills.js'
      ],
      name: 'vendor.js',
      dest: dest + '/assets/scripts/'
    },
    vendorCSS: {
      src: [
        vendorSrc + '/bootstrap.css',
        bowerSrc + '/flexslider/flexslider.css',
        bowerSrc + '/mediaelement/build/mediaelementplayer.css'
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
      dontRenameFile: ['.php', '.md', '.json', '/favicon.ico', '/favicon.png', '/apple-touch-icon-180x180.png',
      '/apple-touch-icon.png', '.woff', '.woff2', '.ttf', '.ttc', '.svg', '.eot', '.otf', '.htc', '.html', '.txt', '.xml', '.jpg', '.png', '.swf', '/content/_global/sharingImages/*.jpg'],
      dontUpdateReference: ['.php', '.md', '.json', '/favicon.ico', '/favicon.png', '/apple-touch-icon-180x180.png',
      '/apple-touch-icon.png', '.woff', '.woff2', '.ttf', '.ttc', '.svg', '.eot', '.otf', '.htc', '.html', '.txt', '.xml', '.jpg', '.png', '.swf', '/content/_global/sharingImages/*.jpg'],
      dontSearchFile: ['vendor.js', 'head.js']
    },
    dest: dest
  }
};
