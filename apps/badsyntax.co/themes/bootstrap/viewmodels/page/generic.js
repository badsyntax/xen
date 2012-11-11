var ViewModel = requireRoot('/xen/viewmodel');
var Blog = requireRoot('/xen/blog');

function Generic(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Generic, ViewModel);

module.exports = exports = Generic;