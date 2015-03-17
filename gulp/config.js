var dest = "./build";
var src = "./src";

module.exports = {
  browserSync: {
    server: {
      baseDir: [dest, src]
    },
    files: [dest + "/**", "!" + dest + "/**.map"],
    open: false
  },
  styles: {
    src: src + "/assets/styles/*.styl",
    dest: dest + "/assets/styles"
  },
  images: {
    src: src + "/assets/images/**",
    dest: dest + "/assets/images"
  },
  templates: {
    HTML: {
      src: [src + "/templates/**/*.jade",
      "!" + src + "/templates/**/*.php.jade"],
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
        extensions: [".coffee", ".hbs"]
      }
    ]
  },
  concat: {
    headJS: {
      src: [
      ],
      name: 'head.js',
      dest: dest + '/assets/scripts/'
    },
    vendorJS: {
      src: [
      ],
      name: 'vendor.js',
      dest: dest + '/assets/scripts/'
    },
    vendorCSS: {
      src: [
      ],
      name: 'vendor.css',
      dest: dest + '/assets/styles'
    }
  }
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
      ignore: ['.php', '/style.css', '/screenshot.png', '.pot', '.md', '.html', '.ico', '.xml', '.txt', '/apple-touch-icon-precomposed.png']
    },
    dest: dest
  }
};
