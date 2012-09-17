var PageModel = require('../models/page');
var PageController = require('./page');

function BlogController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(BlogController, PageController);

BlogController.prototype.actionTag = function() {

  var tag = this.req.params.id;
  var page = PageModel.factory('blog');

  page.view = 'page/blog/tag';

  this.layout.setData({
    page: page,
    tag: tag
  });
};

module.exports = BlogController;