var LayoutViewModel = require('../layout');
var ViewModel = requireRoot('/xen/viewmodel');
var PageModel = requireApp('/models/page');
var Cache = requireRoot('/xen/cache');

function SiteLayoutViewModel() {
  LayoutViewModel.apply(this, arguments);
}
require('util').inherits(SiteLayoutViewModel, LayoutViewModel);

SiteLayoutViewModel.prototype.navigation = function(callback) {
  ViewModel.factory('fragments/navigation', {
    page: this.getData('page')
  }).render(callback);
};

SiteLayoutViewModel.prototype.head = function(callback) {
  ViewModel.factory('fragments/head', { 
    app: this.getData('app'),
    page: this.getData('page')
  }).render(callback);
};

SiteLayoutViewModel.prototype.scripts = function(callback) {
  Cache.callback('fragments/scripts', callback, function(setCache){
    ViewModel.factory('fragments/scripts', {
      app: this.getData('app'),
      route: this.getData('req').route
    }).render(setCache);
  }.bind(this));
};

SiteLayoutViewModel.prototype.body = function(callback) {
  var req = this.getData('req');
  Cache.callback('body/' + req.url, callback, function(setCache) {
    ViewModel.factory(this.getData('page').view, this.getData())
    .render(setCache);
  }.bind(this), req.method !== 'POST');
};

module.exports = exports = SiteLayoutViewModel;