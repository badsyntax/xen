var Blog = require('../lib/blog');
var View = require('../lib/view');
var Theme = require('../lib/theme');
var PageModel = require('../models/page');
var PageController = require('./page');
var siteConfig = require('../config/site');
var themeConfig = require('../themes/' + siteConfig.theme + '/config');

function BlogController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(BlogController, PageController);

// Filter by tag
BlogController.prototype.actionTag = function() {

  var uri = 'blog';

  this.layout.setData({
    page: PageModel.factory(uri)
  });

  // // Show the blog page content
  // this.req.route.contentUri = 'blog';

  // var page = this.req.query.page || 1;
  // var tag = this.req.params.id;
  // var blog = new Blog();

  // blog.filterByTag(tag);
  
  // var posts = blog.getPosts(page, 10);
  // var tags = blog.getTags(tag, 10);

  // if (!posts.length) {
  //   this.res.send(404);
  //   return;
  // }

  // this.layout.setData({
  //   posts: posts,
  //   tags: tags,
  //   pagination: this.renderPagination(blog.pagination)
  // });
};

module.exports = BlogController;