var DataStore = requireRoot('/lib/datastore');
var PageModel = requireRoot('/models/page');
var ViewModel = requireRoot('/lib/viewmodel');

function NavigationViewModel() {
  ViewModel.apply(this, arguments); 
}

require('util').inherits(NavigationViewModel, ViewModel);

NavigationViewModel.prototype.pages = function(uri) {
  return new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    data.active = (data.uri === uri);
    return new PageModel(data);
  });
};

NavigationViewModel.prototype.siteConfig = function() {
  return requireRoot('/config/site');
};

module.exports = exports = NavigationViewModel;