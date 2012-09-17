var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');

function PostViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(PostViewModel, ViewModel);

PostViewModel.prototype.breadcrumbs = function() {
  return ViewModel.factory('fragments/breadcrumbs', {
    breadcrumbs: requireRoot('/lib/breadcrumbs').get()
  }).render();
};

module.exports = exports = PostViewModel;