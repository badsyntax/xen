var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireRoot('/config/site');
var Assets = requireRoot('/lib/assets');

function LayoutViewModel() {
  ViewModel.apply(this, arguments); 
}

require('util').inherits(LayoutViewModel, ViewModel);

LayoutViewModel.prototype.getNavigation = function() {
  return ViewModel.factory('fragments/navigation', {
    page: this.view.data.page
  }).render();
};

LayoutViewModel.prototype.getHead = function() {
  return ViewModel.factory('fragments/head', { 
    app: this.view.data.app,
    page: this.view.data.page
  }).render();
};

LayoutViewModel.prototype.getScripts = function() {
  return ViewModel.factory('fragments/scripts', {
    app: this.view.data.app,
    route: this.view.data.route,
  }).render();
};

module.exports = exports = LayoutViewModel;