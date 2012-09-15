/*global $:false, _:false, prettyPrint:false*/

/**********************
 * Blog controller
 **********************/
App.Controllers.Blog = function() {
  
  App.Controllers.Page.apply(this, arguments);

  this.getElements();
  this.bindEvents();
  this.showDisqusCommentsCount();

  if (!!this.config.twitterUserName) {
    this.showTweets();
  }
};

App.Util.inherits(App.Controllers.Blog, App.Controllers.Page);

App.Controllers.Blog.prototype.initPlugins = function() {
  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  prettyPrint();
};

App.Controllers.Blog.prototype.getElements = function() {
  this.posts = $('.post');
  this.expandButton = $('#posts-expand');
  this.collapseButton = $('#posts-collapse');
  this.sidebar = $('#sidebar');
  this.navbar = $('#navbar');
  this.tweets = $('#latest-tweets');
};

App.Controllers.Blog.prototype.bindEvents = function() {
  this.collapseButton.on('click', $.proxy(this, 'collapsePosts'));
  this.expandButton.on('click', $.proxy(this, 'expandPosts'));
  $(window).on('resize', $.proxy(this, 'onWindowResize')).trigger('resize');
};

App.Controllers.Blog.prototype.onWindowResize = function() {
  clearTimeout(this.timer);
  this.timer = setTimeout($.proxy(this, 'repositionSidebar'), 40);
};

App.Controllers.Blog.prototype.repositionSidebar = function() {

  this.sidebar.css({
    position: 'static', 
    width: 'auto',
    height: 'auto',
    left: 'auto',
    top: 'auto'
  });

  var winHeight = $(window).height();
  var winWidth = $(window).width();
  var sidebarHeight = this.sidebar.outerHeight();
  var navbarHeight = this.navbar.outerHeight() + 30;
  var isMobileDevice = winWidth <= 979;
  var sidebarHigherThanViewport = winHeight < ( sidebarHeight + navbarHeight );

  if ( isMobileDevice || sidebarHigherThanViewport ) {
    return;
  }
    
  this.sidebar.css({
    width: this.sidebar.outerWidth(),
    height: sidebarHeight,
    left: this.sidebar.offset().left,
    top: this.sidebar.offset().top,
    position: 'fixed'
  });
};

App.Controllers.Blog.prototype.expandPosts = function() {
  this.posts.find('.body').show();
};

App.Controllers.Blog.prototype.collapsePosts = function() {
  this.posts.find('.body').hide();
};

App.Controllers.Blog.prototype.showDisqusCommentsCount = function() {
  App.Util.globalizeConfig( App.Config.get('disqus') );
  App.Util.insertScript('disqus-comments-count', 'http://' + App.Config.get('disqus.disqus_shortname') + '.disqus.com/count.js');
};

App.Controllers.Blog.prototype.showTweets = function() {
  
  var username = this.config.twitterUserName;

  var feedURL = [
    'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true',
    'include_rts=true',
    'screen_name=' + username,
    'count=5',
    'callback=?'
  ].join('&');
  
  $.getJSON(feedURL, $.proxy(function(data) {

    if (!data) {
      return;
    }

    var template = _.template('<li><a href="<%= url %>"><%= text %></a></li>');
    var html = '';
    
    _.each(data, function(tweet) {
      tweet.url = 'https://twitter.com/' + username + '/status/' + tweet.id_str;
      html += template(tweet);
    });

    this.tweets
    .find('ul')
      .append(html)
      .end()
    .fadeIn();

  }, this));
};