var ViewModel = requireRoot('/xen/viewmodel');
var siteConfig = requireApp('/config/site');
var Assets = requireRoot('/xen/assets');

function HeadViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(HeadViewModel, ViewModel);

HeadViewModel.prototype.styles = function(callback) {
  var assets = new Assets(this.getData('app'));  
  callback(assets.render('style', 'login.styles'));
};

HeadViewModel.prototype.siteConfig = siteConfig;

module.exports = exports = HeadViewModel;