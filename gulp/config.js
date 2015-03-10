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
  staticFiles: {
    src: src + "/static/**",
    dest: dest
  },
  iconFonts: {
    name: 'Gulp Starter Icons',
    src: src + '/assets/icons/*.svg',
    dest: dest + '/assets/fonts',
    sassDest: src + '/assets/styles',
    template: './gulp/tasks/iconFont/template.sass.swig',
    sassOutputName: '_icons.sass',
    fontPath: 'fonts',
    className: 'icon',
    options: {
      fontName: 'Post-Creator-Icons',
      appendCodepoints: true,
      normalize: false
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
      }, {
        entries: src + "/assets/scripts/vendor.coffee",
        dest: dest + "/assets/scripts",
        outputName: "vendor.js",
        extensions: [".coffee", ".hbs"]
      }, {
        entries: src + "/assets/scripts/head.coffee",
        dest: dest + "/assets/scripts",
        outputName: "head.js",
        extensions: [".coffee", ".hbs"]
      }
    ]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  },
  clean: dest
};
