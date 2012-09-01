module.exports = function(grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: [
        'test/**/*.js'
      ]
    },
    lint: {
      files: [
        'grunt.js', 
        'lib/!(globalize|stylehtml)*.js',
        'controllers/**/*.js', 
        'models/**/*.js', 
        'test/**/*.js', 
        'public/js/App.js',
        'public/js/App.Config.js',
        'public/js/App.Util.js',
        'public/js/Controllers/*.js'
      ]
    },
    concat: {
      dist: {
        src: [
          'public/src/css/bootstrap.css', 
          'public/src/css/style.css'
        ],
        dest: 'public/css/style.css'
      }
    },
    min: {
      dist: {
        src: [
          'public/src/js/lib/jquery.js',
          'public/src/js/lib/underscore.js',
          'public/src/js/lib/prettify.js',
          'public/src/js/lib/bootstrap.js',
          'public/src/js/App.js',
          'public/src/js/App.Config.js',
          'public/src/js/App.Util.js',
          'public/src/js/Controllers/*.js'
        ],
        dest: 'public/js/app.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true,
        App: true,
        window: false,
        document: false
      }
    }
  });

  grunt.registerTask('default', 'lint concat min');
};