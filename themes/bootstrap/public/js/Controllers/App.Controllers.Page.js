/*global document:false, window:false, prettyPrint:false, $:false, _:false*/

/**********************
 * Page controller
 **********************/
App.Controllers.Page = function() {

  App.Controllers.Base.apply(this, arguments);

  this.initTracking();
  this.initPlugins();
  this.setupScrollToTop();
};

App.Util.inherits(App.Controllers.Page, App.Controllers.Base);

App.Controllers.Page.prototype.initTracking = function() {

  if (!this.config.trackPage) {
    return;
  }

  window._gaq = [];
  window._gaq.push(['_setAccount', App.Config.get('analytics.account')]);
  window._gaq.push(['_trackPageview']);

  var url = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  
  App.Util.insertScript('google-analytics', url);
};

App.Controllers.Page.prototype.setupScrollToTop = function() {
  
  this.isScrolling = false;
  this.topElement = $('<a href="#" id="backtotop" class="btn" />').appendTo('body');
  this.topElement.append('<i class="icon icon-chevron-up" />');

  this.topElement.on('click', function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  });
  
  $(window).scroll($.proxy(function(){
    this.isScrolling = true;
  }, this));

  setInterval($.proxy(this.onWindowScroll, this), 400);
};

App.Controllers.Page.prototype.onWindowScroll = function() {
  if (this.isScrolling) {
    this.isScrolling = false;
    if ($(window).scrollTop() > 200) {
      if (!this.hasShown) {
        this.hasShown = true;
        this.topElement.fadeIn(200);
      }
    } else {
      if (this.hasShown) {
        this.hasShown = false;
        this.topElement.fadeOut(100);
      }
    }
  }
}

App.Controllers.Page.prototype.initPlugins = function() {};