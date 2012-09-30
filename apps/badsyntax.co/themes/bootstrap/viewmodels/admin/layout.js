var ViewModel = requireRoot('/lib/viewmodel');
var PageModel = requireApp('/models/page');
var Cache = requireRoot('/lib/cache');

function LayoutViewModel() {
  ViewModel.apply(this, arguments);
  this.setData({ layout: false });
}
require('util').inherits(LayoutViewModel, ViewModel);



module.exports = exports = LayoutViewModel;