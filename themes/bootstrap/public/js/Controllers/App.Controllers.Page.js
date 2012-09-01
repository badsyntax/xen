/*global document:false, window:false, prettyPrint:false, $:false, _:false*/

/**********************
 * Page controller
 **********************/
App.Controllers.Page = function() {

  App.Controllers.Base.apply(this, arguments);

  this.initTracking();
  this.initPlugins();
};

App.Util.inherits(App.Controllers.Page, App.Controllers.Base);

App.Controllers.Page.prototype.initTracking = function() {

  if (!this.config.trackPage) {
    return;
  }

  window._gaq = [];
  window._gaq.push(['_setAccount', App.Config.Analytics.account]);
  window._gaq.push(['_trackPageview']);

  var url = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  
  App.Util.insertScript('google-analytics', url);
};

App.Controllers.Page.prototype.initPlugins = function() {};