var DataStore = require('../lib/datastore');
var fs = require('fs');

module.exports = function(grunt ) {

  grunt.registerTask('xen', 'Xen management task', function() {

    var arg = Array.prototype.slice.call(arguments, 1);
    var config = grunt.config.get('xen');
    var task = this;

    var defaultHTMLpath = grunt.task.getFile('xen/static/default-content.html');
    var defaultHTMLsrc = grunt.file.read(defaultHTMLpath);

    if(!config){
      grunt.fatal('Oops! Please provide XenTask configuration in your grunt.js file');
      return;
    }

    var getDataItem = function(type, props, uriPrefix) {

      var uriSegment = props.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      props.uri = uriPrefix + uriSegment;
      props.contentPath = type + '/' + uriSegment + '.html';
      props.dateCreated = (props.dateCreated === 'now') ? new Date().getTime() : props.dateCreated;
      props.showInNav = ( props.showInNav === 'y' || props.showInNav === 'Y' );
      props.tags = props.tags ? props.tags.replace(/,\s+/g, ',').split(',') : [];

      return props;
    };

    var wipeDirectory = function(dir, callback) {
      fs.readdir(dir, function(err, files) {
        if (!files.length) return callback();
        var i = 0;
        files.forEach(function(file) {
          var filePath = dir + '/' + file;
          fs.stat(filePath, function(err, stats) {
            if (err) {
              console.log(cd .JSON.stringify(err));
              return callback();
            } 
            if (!stats.isFile()) return callback();
            fs.unlink(filePath, function(err) {
              if (err) console.log(JSON.stringify(err));
              if (++i === files.length) callback();
            });
          });
        });
      });  
    };

    var copyFiles = function(oldDir, newDir, callback) {
      fs.readdir(oldDir, function(err, files) {
        if (!files.length) return callback();
        var dir = oldDir.replace(/tasks/, '');
        files.forEach(function(file) {
          var content = grunt.file.read(grunt.task.getFile(dir + '/' + file));
          grunt.file.write('./' + newDir + '/' + file, content);
        });
        callback();
      });
    };

    var pagePrompts = {
      content: [{
        name: 'title',
        message: 'Title'
      }, {
        name: 'description',
        message: 'Description'
      }, {
        name: 'tags',
        message: 'Tags (comma separated)'
      }, {
        name: 'view',
        message: 'View file',
        'default': 'page/generic'
      }, {
        name: 'dateCreated',
        message: 'Date',
        'default': 'now'
      }, {
        name: 'showInNav',
        message: 'Show in navigation? (Y/n)',
        'default': 'y'
      }]
    };

    // sub-task-specific utilities
    var subtask = {
      addpost: function(uri) {
        var done = task.async();
        grunt.helper('prompt', pagePrompts.content, function(err, props) {
          
          var data = getDataItem('posts', props, 'post/');
          new DataStore('posts').add(data).save();

          var contentPath = './content/' + data.contentPath;
          grunt.file.write(contentPath, defaultHTMLsrc);

          done();
        });
      },
      addpage: function(uri) {
        var done = task.async();
        grunt.helper('prompt', pagePrompts.content, function(err, props) {
          var data = getDataItem('pages', props);
          new DataStore('pages').add(data).save();
          done();
        });
      },
      removepage: function(uri) {
        new DataStore('pages').where(function(page){
          return ( page.uri === uri );
        }).remove();
      },
      removepost: function(uri) {
        new DataStore('posts').where(function(post){
          return ( post.uri === uri );
        }).remove();
      },
      install: function() {

        var done = task.async();

        var prompts = {
          content: [{
            name: 'sitename',
            message: 'Site name:'
          }, {
            name: 'theme',
            message: 'Theme:',
            default: 'bootstrap'
          }]
        };

        grunt.helper('prompt', prompts.content, function(err, props) {

          // TODO: We have to use the user options to create the config file
          var content = grunt.file.read(grunt.task.getFile('xen/config/site.js'));
          grunt.file.write('./config/site.js', content);

          subtask.reset();
          
          done();
        });
      },
      reset: function() {
        var done = task.async();

        var pages = new DataStore(null, __dirname + '/xen/content/pages.json');
        pages.save(__dirname + '/../content/pages.json')
        
        var posts = new DataStore(null, __dirname + '/xen/content/posts.json');
        posts.save(__dirname + '/../content/posts.json')

        wipeDirectory('content/pages', function() {
          wipeDirectory('content/posts', function() {
            copyFiles('tasks/xen/content/pages', 'content/pages', function() {
              copyFiles('tasks/xen/content/posts', 'content/posts', function() {
                done();
              })
            });
          });
        });
      }
    };

    var stask = subtask[this.args[0]];
    if (stask) {
      stask.apply(stask, arg);
    } else {
      grunt.fail.warn('Sub-task not found!');
    }
  });
};
