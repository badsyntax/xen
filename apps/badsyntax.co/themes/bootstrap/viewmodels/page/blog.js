var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');
var View = requireRoot('/lib/view');

function BlogViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(BlogViewModel, ViewModel);

BlogViewModel.prototype.blog = function() {
  if (!this._blog) {
    this._blog = new Blog();
  }
  return this._blog;
}

BlogViewModel.prototype.posts = function() {
  var page = this.getData('req').query.page || 1;
  return this.blog().getPosts(page, 10);
};

BlogViewModel.prototype.tags = function() {
  return this.blog().getTags(null, 10);
};

BlogViewModel.prototype.pagination = function() {

  var pagination = this.blog().pagination;
  var pages = pagination.pages();
  var prev = pages[ pagination.page - 1 ];
  var next = pages[ pages.length - 1 ];

  return new View('fragments/pagination', { 
    pages: pages,
    lastPage: ( pagination.page + 1 === pagination.totalPages ),
    firstPage: ( pagination.page === 0),
    prevUrl: prev ? prev.url : null,
    nextUrl: next.url
  }).render();
};

module.exports = exports = BlogViewModel;