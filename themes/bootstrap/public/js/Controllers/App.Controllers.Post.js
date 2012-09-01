/*global $:false, _:false, prettyPrint:false*/

/**********************
 * Post controller
 **********************/
App.Controllers.Post = function() {

  App.Controllers.Page.apply(this, arguments);

  this.bindEvents();
  this.showGooglePlusButton();
  this.showTweetButton();

  if (window.location.hash.indexOf('disqus_thread') !== -1) {
    this.showDisqusComments();
  }
};

App.Util.inherits(App.Controllers.Post, App.Controllers.Page);

App.Controllers.Post.prototype.initPlugins = function() {

  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  
  prettyPrint();
};

App.Controllers.Post.prototype.bindEvents = function() {
  $('#view-comments').on('click', $.proxy(this, 'onViewCommentsClick'));
};

App.Controllers.Post.prototype.showTweetButton = function() {
  App.Util.insertScript('twitter-wjs', '//platform.twitter.com/widgets.js');
};

App.Controllers.Post.prototype.showGooglePlusButton = function() {
  App.Util.globalizeConfig( App.Config.GooglePlus );
  App.Util.insertScript('google-plus', 'https://apis.google.com/js/plusone.js');
};

App.Controllers.Post.prototype.onViewCommentsClick = function(e) {
  e.preventDefault();
  e.target.disabled = true;
  e.target.innerHTML = e.target.innerHTML.replace(/(.*>)[\s\S]+$/, '$1 Loading...');
  e.target.className += ' disabled';
  this.showDisqusComments();
};

App.Controllers.Post.prototype.showDisqusComments = function() {
  
  window.disqus_config = this.disqusConfig;

  App.Util.globalizeConfig( App.Config.Disqus );
  App.Util.insertScript('disqus-comments', 'http://' + App.Config.Disqus.disqus_shortname + '.disqus.com/embed.js');
};

App.Controllers.Post.prototype.disqusConfig = function() {
  this.callbacks.onReady.push(App.Controllers.Post.prototype.onDisqusReady);
};

App.Controllers.Post.prototype.onDisqusReady = function() {
  $('html,body').animate({
    scrollTop: $('#disqus_thread').offset().top - 70 
  }, 800);
};
