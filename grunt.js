var siteConfig = require('./config/site');
var themeConfig = require('./themes/' + siteConfig.theme + '/config');

var scripts = [];
themeConfig.assets.script.forEach(function(script){
  scripts.push('themes/' + siteConfig.theme + '/public/' + script);
});

var styles = [];
themeConfig.assets.style.forEach(function(style){
  styles.push('themes/' + siteConfig.theme + '/public/' + style);
});

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-yui-compressor');

  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: [
        'test/**/*.js'
      ]
    },
    xen: {

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
    cssmin: {
      dist: {
        src: styles,
        dest: 'public/css/app.min.css'
      }
    },
    min: {
      dist: {
        src: scripts,
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

  grunt.loadTasks('tasks');

  grunt.registerTask('default', 'lint cssmin min');
};