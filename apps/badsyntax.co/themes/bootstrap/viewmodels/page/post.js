var ViewModel = requireRoot('/xen/viewmodel');
var Blog = requireRoot('/xen/blog');

function PostViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(PostViewModel, ViewModel);

PostViewModel.prototype.breadcrumbs = function(callback) {
  ViewModel.factory('fragments/breadcrumbs', {
    breadcrumbs: requireRoot('/xen/breadcrumbs').get()
  }).render(callback);
};

module.exports = exports = PostViewModel;