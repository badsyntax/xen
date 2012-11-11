var ViewModel = requireRoot('/xen/viewmodel');

function BreadCrumbs(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(BreadCrumbs, ViewModel);

module.exports = exports = BreadCrumbs;