module.exports = function(grunt ) {

  var XenTask = {
    init: function(task) {

      var config = grunt.config.get('xen');

      if(!config){
        grunt.fatal('Oops! Please provide XenTask configuration in your grunt.js file');
        return;
      }

      this.config = config;      
      this.task = task;
    },
    addContent: function() {

      var done = this.task.async();

      var prompts = [
        {
          name: 'post_or_page',
          message: 'Post or page? (post/page)',
          default: 'page'          
        },
        {
          name: 'title',
          message: 'Page title'
        },
        {
          name: 'description',
          message: 'Page description'
        },
        {
          name: 'view',
          message: 'View file',
          default: 'page/generic'
        },
        {
          name: 'dateCreated',
          message: 'Date',
          default: 'now'
        },
        {
          name: 'showInNav',
          message: 'Show in navigation?',
          default: 'y/N'
        }
      ];

      function getUrlFromTitle(title) {
        return title
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
      }

      function onPromptsComplete(err, props) {

        var url = getUrlFromTitle(props.title);
        var dataPath = grunt.task.getFile('../content/' + props.post_or_page + 's.json');
        var contentPath = grunt.task.getFile('../content/' + props.post_or_page + 's/' + url + '.html');
        var data = grunt.file.readJSON(dataPath);

        console.log(contentPath);

        if (props.dateCreated === 'now') {
          props.dateCreated = new Date.getTime();
        }
        props.showInNav = ( props.showInNav === 'y' || props.showInNav === 'Y' );

        data.push({
          uri: url,
          title: props.title,
          view: props.view,
          contentPath: props.contentPath,
          dateCreated: props.dateCreated,
          description: props.description,
          showInNav: props.showInNav
        });

        grunt.file.write(dataPath, JSON.stringify(data));

        // console.log(data);
        // console.log(arguments);

        done();
      }

      grunt.helper('prompt', {}, prompts, onPromptsComplete);
    }
  };

  grunt.registerTask('xen', 'Xen management task', function() {

    XenTask.init(this);

    // Add new content
    if (this.flags.addcontent) {
      XenTask.addContent();
    }
  });
};