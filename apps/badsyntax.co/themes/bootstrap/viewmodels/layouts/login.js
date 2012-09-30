var ViewModel = requireRoot('/lib/viewmodel');
var LayoutViewModel = require('../layout');
var PageModel = requireApp('/models/page');
var Cache = requireRoot('/lib/cache');

function LoginLayoutViewModel() {
  LayoutViewModel.apply(this, arguments);
  this.setData({ layout: false });
}
require('util').inherits(LoginLayoutViewModel, LayoutViewModel);

LoginLayoutViewModel.prototype.navigation = function(callback) {
  callback();
};

LoginLayoutViewModel.prototype.head = function(callback) {
  ViewModel.factory('fragments/login/head', { 
    app: this.getData('app')
  }).render(callback);
};

LoginLayoutViewModel.prototype.scripts = function(callback) {
  callback();
};

LoginLayoutViewModel.prototype.body = function(callback) {
  ViewModel.factory('page/login', {    
  }).render(callback);
};

module.exports = exports = LoginLayoutViewModel;