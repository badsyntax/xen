var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireRoot('/config/site');
var Assets = requireRoot('/lib/assets');

function HeadViewModel(data) {
  ViewModel.apply(this, arguments); 
}

require('util').inherits(HeadViewModel, ViewModel);

HeadViewModel.prototype.styles = function() {
  var assets = new Assets(this.getData('app'));  
  return assets.render('style');
};

HeadViewModel.prototype.siteConfig = function() {
  return siteConfig;
};

module.exports = exports = HeadViewModel;