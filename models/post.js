var PageModel = require('./page');
var TagModel = require('./tag');

function PostModel() {

  PageModel.apply(this, arguments);

  this.tagModels = this.tags ? this.tags.map(function(tag){
    return new TagModel({ name: tag });
  }) : [];
}

require('util').inherits(PostModel, PageModel);

PostModel.factory = function(uri) {
  return PageModel.factory(uri, 'posts');
}

module.exports = exports = PostModel;  