var ViewModel = requireRoot('/lib/viewmodel');
var siteConfig = requireRoot('/config/site');
var Assets = requireRoot('/lib/assets');

  var page = this.req.query.page || 1;
  var blog = new Blog();

  var posts = blog.getPosts(page, 10);
  var tags = blog.getTags(null, 10);

function Blog(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Blog, ViewModel);

Blog.prototype.posts = function() {
  console.log('test');
};

Blog.prototype.tags = function() {
  console.log('test');
  
};

Blog.prototype.pagination = function() {
  this.renderPagination(blog.pagination);
};

module.exports = exports = Blog;