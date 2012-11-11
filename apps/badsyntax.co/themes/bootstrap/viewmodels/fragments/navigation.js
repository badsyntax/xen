var DataStore = requireRoot('/xen/datastore');
var PageModel = requireApp('/models/page');
var ViewModel = requireRoot('/xen/viewmodel');
var Cache = requireRoot('/xen/cache');

function NavigationViewModel() {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(NavigationViewModel, ViewModel);

NavigationViewModel.prototype.pages = function(callback) {

  var pageUri = this.getData('page').uri;

  var pages = new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    data.active = (data.uri === pageUri);
    return new PageModel(data);
  });

  callback(pages);
};

NavigationViewModel.prototype.siteConfig = requireApp('/config/site');

module.exports = exports = NavigationViewModel;