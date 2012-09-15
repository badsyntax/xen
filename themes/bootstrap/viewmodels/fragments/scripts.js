var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireRoot('/config/site');
var Assets = requireRoot('/lib/assets');

function ScriptsViewModel(data) {
  ViewModel.apply(this, arguments); 
}

require('util').inherits(ScriptsViewModel, ViewModel);

ScriptsViewModel.prototype.getScripts = function() {
  var assets = new Assets(this.view.data.app);  
  return assets.render('script');
};

ScriptsViewModel.prototype.getController = function() {
  var controller = this.view.data.route.controller;
  return controller.charAt(0).toUpperCase() + controller.slice(1);
};

ScriptsViewModel.prototype.getSiteConfigJSON = function() {
  return JSON.stringify(siteConfig);
};

module.exports = exports = ScriptsViewModel;