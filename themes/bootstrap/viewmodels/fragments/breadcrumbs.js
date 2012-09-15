var ViewModel = requireRoot('/lib/viewmodel');

function BreadCrumbs(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(BreadCrumbs, ViewModel);

module.exports = exports = BreadCrumbs;