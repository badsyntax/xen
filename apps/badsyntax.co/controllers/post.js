var PostModel = require('../models/post');
var PageController = require('./page');

function PostController() { PageController.apply(this, arguments); }
require('util').inherits(PostController, PageController);

PostController.prototype.actionIndex = function(){ 

  var uri = this.req.route.contentUri || this.req.url.replace('/', '');
  var page = PostModel.factory(uri);
  var breadcrumbs = requireRoot('/xen/breadcrumbs');

  breadcrumbs.set([{
    url: '/',
    title: 'Home'
  }, {
    url: '/blog',
    title: 'Blog'
  }, {
    url: page.url,
    title: page.title
  }]);

  this.layout.setData({
    page: page
  });
};

module.exports = PostController;