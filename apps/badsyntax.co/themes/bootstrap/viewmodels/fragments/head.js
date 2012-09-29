var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireApp('/config/site');
var Assets = requireRoot('/lib/assets');

function HeadViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(HeadViewModel, ViewModel);

HeadViewModel.prototype.styles = function(callback) {
  var assets = new Assets(this.getData('app'));  
  callback(assets.render('style'));
};

HeadViewModel.prototype.siteConfig = siteConfig;

module.exports = exports = HeadViewModel;