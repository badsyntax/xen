module.exports = {
  modules: {
    blog: {
      twitterFeed: {
        username: 'badsyntax'
      }
    }
  },
  assets: {
    script: [
      'js/lib/jquery.js',
      'js/lib/underscore.js',
      'js/lib/prettify.js',
      'js/lib/bootstrap.js',
      'js/App.js',
      'js/App.Config.js',
      'js/App.Util.js',
      'js/Controllers/App.Controllers.Base.js',     
      'js/Controllers/App.Controllers.Page.js',     
      'js/Controllers/App.Controllers.Blog.js',     
      'js/Controllers/App.Controllers.Contact.js',     
      'js/Controllers/App.Controllers.Home.js',     
      'js/Controllers/App.Controllers.Post.js'     
    ],
    style: [
      'css/bootstrap.css',
      'css/style.css'
    ]
  }
};