module.exports = function(grunt ) {

  grunt.registerTask('xen', 'Xen management task', function() {

    var arg = Array.prototype.slice.call(arguments, 1);
    var config = grunt.config.get('xen');
    var task = this;

    if(!config){
      grunt.fatal('Oops! Please provide XenTask configuration in your grunt.js file');
      return;
    }

    // sub-task-specific utilities
    var init = {
      deletepage: function(uri) {

        var dataPath = grunt.task.getFile('../content/pages.json');
        var data = grunt.file.readJSON(dataPath);
        var found = false;

        data = data.filter(function(item){
          var isItem = (item.uri === uri);
          if (isItem) { found = true; }
          return !isItem;
        });

        if (!found) {
          grunt.fail.warn('Page not found!');
          return;
        }

        grunt.file.write(dataPath, JSON.stringify(data, null, 2));
      },
      addcontent: function() {

        var done = task.async();

        var prompts = [{
          name: 'post_or_page',
          message: 'Post or page? (post/page)',
          default: 'page'          
        }, {
          name: 'title',
          message: 'Page title'
        }, {
          name: 'description',
          message: 'Page description'
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
        }];

        grunt.helper('prompt', {}, prompts, function(err, props) {

          var url = 'post/' + props.title
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');
            
          var dataPath = grunt.task.getFile('../content/' + props.post_or_page + 's.json');
          var contentPath = url + '.html';
          var data = grunt.file.readJSON(dataPath);

          if (props.dateCreated === 'now') {
            props.dateCreated = new Date().getTime();
          }
          props.showInNav = ( props.showInNav === 'y' || props.showInNav === 'Y' );

          data.push({
            uri: url,
            title: props.title,
            view: props.view,
            contentPath: contentPath,
            dateCreated: props.dateCreated,
            description: props.description,
            showInNav: props.showInNav
          });

          grunt.file.write(dataPath, JSON.stringify(data, null, 2));
          done();
        });
      }
    };

    var subtask = init[this.args[0]];
    if (subtask) {
      subtask.apply(init, arg);
    } else {
      grunt.fail.warn('Sub-task not found!');
    }
  });
};