var ViewModel = requireRoot('/xen/viewmodel');
var PageModel = requireApp('/models/page');
var Cache = requireRoot('/xen/cache');

function LayoutViewModel() {
  ViewModel.apply(this, arguments);
  this.setData({ layout: false });
}
require('util').inherits(LayoutViewModel, ViewModel);



module.exports = exports = LayoutViewModel;