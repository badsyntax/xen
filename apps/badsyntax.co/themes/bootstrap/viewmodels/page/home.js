var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');

function Home(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Home, ViewModel);

Home.prototype.posts = function(callback) {
  var posts = new Blog().getPosts(1, 5);
  callback(posts);
};

module.exports = exports = Home;