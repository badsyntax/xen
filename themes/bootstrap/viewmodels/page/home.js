var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');

function Home(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Home, ViewModel);

Home.prototype.posts = function() {
  return new Blog().getPosts(1, 5);
};

module.exports = exports = Home;