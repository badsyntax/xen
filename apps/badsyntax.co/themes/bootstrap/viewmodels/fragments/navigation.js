var DataStore = requireRoot('/lib/datastore');
var PageModel = requireApp('/models/page');
var ViewModel = requireRoot('/lib/viewmodel');
var Cache = requireRoot('/lib/cache');

function NavigationViewModel() {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(NavigationViewModel, ViewModel);

NavigationViewModel.prototype.pages = function() {

  var pageUri = this.getData('page').uri;

  return new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    data.active = (data.uri === pageUri);
    return new PageModel(data);
  });
};

NavigationViewModel.prototype.siteConfig = requireApp('/config/site');

module.exports = exports = NavigationViewModel;