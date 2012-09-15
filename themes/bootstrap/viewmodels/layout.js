var ViewModel = requireRoot('/lib/viewmodel');
var DataStore = requireRoot('/lib/datastore');
var PageModel = requireRoot('/models/page');
var siteConfig = requireRoot('/config/site');
var Assets = requireRoot('/lib/assets');

function LayoutViewModel() {
  ViewModel.apply(this, arguments); 
}

require('util').inherits(LayoutViewModel, ViewModel);

LayoutViewModel.prototype.getNavigation = function() {
  return ViewModel.factory('fragments/navigation', {
    page: this.getData('page')
  }).render();
};

LayoutViewModel.prototype.getHead = function() {
  return ViewModel.factory('fragments/head', { 
    app: this.getData('app'),
    page: this.getData('page')
  }).render();
};

LayoutViewModel.prototype.getScripts = function() {
  return ViewModel.factory('fragments/scripts', {
    app: this.getData('app'),
    route: this.getData('req').route
  }).render();
};

module.exports = exports = LayoutViewModel;