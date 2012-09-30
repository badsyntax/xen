module.exports = {
  modules: {
    blog: {
      twitterFeed: {
        username: false // or 'TWITTER_USERNAME' to show feed
      }
    }
  },
  assets: {
    scripts: [
      'js/lib/jquery.js',
      'js/lib/underscore.js',
      'js/lib/prettify.js',
      'js/lib/bootstrap.js',
      'js/App.js',
      'js/App.Config.js',
      'js/App.Util.js',
      'js/Plugins/App.Plugins.BackToTop.js',
      'js/Controllers/App.Controllers.Base.js',     
      'js/Controllers/App.Controllers.Page.js',     
      'js/Controllers/App.Controllers.Blog.js',     
      'js/Controllers/App.Controllers.Contact.js',     
      'js/Controllers/App.Controllers.Home.js',     
      'js/Controllers/App.Controllers.Post.js'     
    ],
    styles: [
      'css/bootstrap.css',
      'css/prettify.css',
      'css/style.css'
    ],
    login: {
      styles: [
        'css/bootstrap.css',
        'css/style.css'
      ]
    }
  }
};