var ViewModel = requireRoot('/lib/viewmodel');

function LayoutViewModel() {
  ViewModel.apply(this, arguments); 
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

LayoutViewModel.prototype.breadcrumbs = function() {
  return ViewModel.factory('fragments/breadcrumbs', {
    breadcrumbs: this.getData('crumbs')
  }).render();
};

module.exports = exports = LayoutViewModel;