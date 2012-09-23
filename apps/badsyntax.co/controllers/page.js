var PageModel = require('../models/page');
var BaseController = requireRoot('/lib/controller');

function PageController() { 
  BaseController.apply(this, arguments); 
}

require('util').inherits(PageController, BaseController);

PageController.prototype.actionIndex = function(){ 

  var uri = this.req.route.contentUri || this.req.url.replace('/', '');
  var page = PageModel.factory(uri);

  if (!page) {
    this.res.send(404);
    return false;
  }

  this.layout.setData({
    page: page
  });
};

module.exports = PageController;