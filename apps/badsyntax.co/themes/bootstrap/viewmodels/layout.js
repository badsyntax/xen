var ViewModel = requireRoot('/xen/viewmodel');

function LayoutViewModel() {
  ViewModel.apply(this, arguments);
  this.setData({ layout: false });
}
require('util').inherits(LayoutViewModel, ViewModel);

module.exports = exports = LayoutViewModel;