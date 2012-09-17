var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireRoot('/config/site');
var Assets = requireRoot('/lib/assets');

function ScriptsViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(ScriptsViewModel, ViewModel);

ScriptsViewModel.prototype.scripts = function() {
  var assets = new Assets(this.getData('app'));  
  return assets.render('script');
};

ScriptsViewModel.prototype.controller = function() {
  var controller = this.getData('route').controller;
  return controller.charAt(0).toUpperCase() + controller.slice(1);
};

ScriptsViewModel.prototype.siteConfigJSON = function() {
  return JSON.stringify(siteConfig);
};

module.exports = exports = ScriptsViewModel;