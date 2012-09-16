var ViewModel = requireRoot('/lib/viewmodel');
var PageModel = requireRoot('/models/page');

function LayoutViewModel() {
  ViewModel.apply(this, arguments);
  this.setData({
    layout: false,
    page: this.getPage()
  });
}
require('util').inherits(LayoutViewModel, ViewModel);

LayoutViewModel.prototype.getPage = function() {

  var uri = (
       this.getData('req').route.contentUri 
    || this.getData('req').url.replace('/', '')
  ).replace(/\?.*$/, ''); // remove query string

  return PageModel.factory(uri);
};

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

LayoutViewModel.prototype.body = function() {
  return ViewModel.factory(this.getData('page').view, this.getData()).render();
};

module.exports = exports = LayoutViewModel;