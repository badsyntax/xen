var ViewModel = requireRoot('/lib/viewmodel');
var PageModel = requireApp('/models/page');
var Cache = requireRoot('/lib/cache');

function LayoutViewModel() {
  ViewModel.apply(this, arguments);
  this.setData({ layout: false });
}
require('util').inherits(LayoutViewModel, ViewModel);

LayoutViewModel.prototype.navigation = function(callback) {
  ViewModel.factory('fragments/navigation', {
    page: this.getData('page')
  }).render(callback);
};

LayoutViewModel.prototype.head = function(callback) {
  ViewModel.factory('fragments/head', { 
    app: this.getData('app'),
    page: this.getData('page')
  }).render(callback);
};

LayoutViewModel.prototype.scripts = function(callback) {
  Cache.callback('fragments/scripts', callback, function(setCache){
    ViewModel.factory('fragments/scripts', {
      app: this.getData('app'),
      route: this.getData('req').route
    }).render(setCache);
  }.bind(this));
};

LayoutViewModel.prototype.body = function(callback) {
  var req = this.getData('req');
  Cache.callback('body/' + req.url, callback, function(setCache) {
    ViewModel.factory(this.getData('page').view, this.getData())
    .render(setCache);
  }.bind(this), req.method !== 'POST');
};

module.exports = exports = LayoutViewModel;