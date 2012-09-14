var DataStore = requireRoot('/lib/datastore');
var PageModel = requireRoot('/models/page');
var ViewModel = requireRoot('/lib/viewmodel');

function NavigationViewModel() {

  ViewModel.apply(this, arguments); 

  this.view.setData({
    pages: this.getNavPages(this.view.data.page.uri),
    siteConfig: requireRoot('/config/site')
  });
}

require('util').inherits(NavigationViewModel, ViewModel);

NavigationViewModel.prototype.getNavPages = function(uri) {
  return new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    data.active = (data.uri === uri);
    return new PageModel(data);
  });
}

module.exports = exports = NavigationViewModel;