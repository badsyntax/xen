var DataStore = require('../lib/datastore');

module.exports = function(grunt ) {

  grunt.registerTask('xen', 'Xen management task', function() {

    var arg = Array.prototype.slice.call(arguments, 1);
    var config = grunt.config.get('xen');
    var task = this;

    if(!config){
      grunt.fatal('Oops! Please provide XenTask configuration in your grunt.js file');
      return;
    }

    var getDataItem = function(type, props, uriPrefix) {

      props.uri = (uriPrefix || '') + props.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      props.contentPath = props.uri + '.html';
      props.dateCreated = (props.dateCreated === 'now') ? new Date().getTime() : props.dateCreated;
      props.showInNav = ( props.showInNav === 'y' || props.showInNav === 'Y' );
      props.tags = props.tags ? props.tags.replace(/,\s+/g, ',').split(',') : [];

      return props;
    };

    var prompts = {
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
        default: 'page/generic'
      }, {
        name: 'dateCreated',
        message: 'Date',
        default: 'now'
      }, {
        name: 'showInNav',
        message: 'Show in navigation?',
        default: 'y/N'
      }]
    };

    // sub-task-specific utilities
    var subtask = {
      addpost: function(uri) {
        var done = task.async();
        grunt.helper('prompt', prompts.content, function(err, props) {
          var data = getDataItem('posts', props, 'post/');
          new DataStore('posts').add(data).save();
          done();
        });
      },
      addpage: function(uri) {
        var done = task.async();
        grunt.helper('prompt', prompts.content, function(err, props) {
          var data = getDataItem('pages', props);
          console.log(data, 'test');
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
    };

    var stask = subtask[this.args[0]];
    if (stask) {
      stask.apply(stask, arg);
    } else {
      grunt.fail.warn('Sub-task not found!');
    }
  });
};