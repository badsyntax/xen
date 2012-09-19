var PageModel = require('../models/page');
var BaseController = requireRoot('/lib/controller');

function PageController() { 
  BaseController.apply(this, arguments); 
}

require('util').inherits(PageController, BaseController);

PageController.prototype.actionIndex = function(){ 

  var uri = this.req.route.contentUri || this.req.url.replace('/', '');

  this.layout.setData({
    page: PageModel.factory(uri)
  });
};

module.exports = PageController;