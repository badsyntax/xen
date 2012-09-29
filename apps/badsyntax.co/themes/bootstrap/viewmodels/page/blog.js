var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');
var View = requireRoot('/lib/view');

function BlogViewModel(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(BlogViewModel, ViewModel);

BlogViewModel.prototype.blog = function(callback) {
  if (!this._blog) {
    this._blog = new Blog();
  }
  callback(this._blog);
}

BlogViewModel.prototype.posts = function(callback) {
  var page = this.getData('req').query.page || 1;
  
  this.blog(function(blog) {
    var posts = blog.getPosts(page, 10);
    callback(posts);
  });
};

BlogViewModel.prototype.tags = function(callback) {
  this.blog(function(blog){
    var tags = blog.getTags(null, 10);
    callback(tags);
  });
};

BlogViewModel.prototype.pagination = function(callback) {

  this.blog(function(blog){
    
    var pagination = blog.pagination;
    var pages = pagination.pages();
    var prev = pages[ pagination.page - 1 ];
    var next = pages[ pages.length - 1 ];

    var paginationView = new View('fragments/pagination', { 
      pages: pages,
      lastPage: ( pagination.page + 1 === pagination.totalPages ),
      firstPage: ( pagination.page === 0),
      prevUrl: prev ? prev.url : null,
      nextUrl: next.url
    }).render();

    callback(paginationView);    
  })
};

module.exports = exports = BlogViewModel;