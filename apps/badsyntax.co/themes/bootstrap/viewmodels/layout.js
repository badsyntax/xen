var ViewModel = requireRoot('/lib/viewmodel');
var PageModel = requireApp('/models/page');

function LayoutViewModel() {
  ViewModel.apply(this, arguments);
  this.setData({ layout: false });
}
require('util').inherits(LayoutViewModel, ViewModel);

LayoutViewModel.prototype.navigation = function() {
  return ViewModel.factory('fragments/navigation', {
    page: this.getData('page')
  }).render();
};

LayoutViewModel.prototype.head = function() {
  return ViewModel.factory('fragments/head', { 
    app: this.getData('app'),
    page: this.getData('page')
  }).render();
};

LayoutViewModel.prototype.scripts = function() {
  return ViewModel.factory('fragments/scripts', {
    app: this.getData('app'),
    route: this.getData('req').route
  }).render();
};

LayoutViewModel.prototype.body = function() {
  return ViewModel.factory(this.getData('page').view, this.getData()).render();
};

module.exports = exports = LayoutViewModel;