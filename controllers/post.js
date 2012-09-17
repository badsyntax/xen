var Blog = require('../lib/blog');
var PostModel = require('../models/post');
var PageController = require('./page');

function PostController() { PageController.apply(this, arguments); }
require('util').inherits(PostController, PageController);

PostController.prototype.actionIndex = function(){ 

  var uri = (
       this.req.route.contentUri 
    || this.req.url.replace('/', '')
  ).replace(/\?.*$/, ''); // remove query string

  this.layout.setData({
    page: PostModel.factory(uri)
  });
};

module.exports = PostController;