var ViewModel = requireRoot('/lib/viewmodel');

function PageViewModel() {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(PageViewModel, ViewModel);

PageViewModel.prototype.page = function() {

  var uri = (this.req.route.contentUri || this.req.url.replace('/', ''));
  
  uri = uri.replace(/\?.*$/, ''); // remove query string

  var page = return PageModel.factory(uri);

  return page;
};

module.exports = exports = PageViewModel;