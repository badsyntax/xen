var ViewModel = requireRoot('/lib/viewmodel');
var PageModel = requireApp('/models/page');

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
  ViewModel.factory('fragments/scripts', {
    app: this.getData('app'),
    route: this.getData('req').route
  }).render(callback);
};

LayoutViewModel.prototype.body = function(callback) {
  ViewModel.factory(this.getData('page').view, this.getData())
  .render(callback);
};

module.exports = exports = LayoutViewModel;