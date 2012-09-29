var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireApp('/config/site');
var Assets = requireRoot('/lib/assets');

function ScriptsViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(ScriptsViewModel, ViewModel);

ScriptsViewModel.prototype.scripts = function(callback) {
  var assets = new Assets(this.getData('app'));  
  callback(assets.render('script'));
};

ScriptsViewModel.prototype.controller = function(callback) {
  var controller = this.getData('route').controller;
  controller = controller.charAt(0).toUpperCase() + controller.slice(1);
  callback(controller);
};

ScriptsViewModel.prototype.siteConfigJSON = function(callback) {
  callback(JSON.stringify(siteConfig));
};

module.exports = exports = ScriptsViewModel;