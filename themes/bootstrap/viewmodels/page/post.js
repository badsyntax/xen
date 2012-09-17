var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');

function Post(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Post, ViewModel);

module.exports = exports = Post;