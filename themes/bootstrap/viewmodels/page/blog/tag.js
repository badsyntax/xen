var BlogViewModel = require('../blog');
var Blog = requireRoot('/lib/blog');

function BlogTag(data) {
  BlogViewModel.apply(this, arguments); 
}
require('util').inherits(BlogTag, BlogViewModel);

BlogTag.prototype.blog = function() {
  if (!this._blog) {
    this._blog = new Blog();
    this._blog.filterByTag(this.getData('tag'));
  }
  return this._blog;
}

module.exports = exports = BlogTag;