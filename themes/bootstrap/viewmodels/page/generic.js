var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');

function Generic(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Generic, ViewModel);

module.exports = exports = Generic;