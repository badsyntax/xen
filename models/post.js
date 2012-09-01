var PageModel = require('./page');
var TagModel = require('./tag');


function PostModel() {

  PageModel.apply(this, arguments);

  this.tagModels = this.tags ? this.tags.map(function(tag){
    return new TagModel({ name: tag });
  }) : [];
}

require('util').inherits(PostModel, PageModel);

module.exports = exports = PostModel;  