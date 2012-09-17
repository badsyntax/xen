var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');
var ViewModel = require('../lib/viewmodel');

function PageController() { 
  BaseController.apply(this, arguments); 
}

require('util').inherits(PageController, BaseController);

PageController.prototype.actionIndex = function(){ 

  var uri = (
       this.req.route.contentUri 
    || this.req.url.replace('/', '')
  ).replace(/\?.*$/, ''); // remove query string

  this.layout.setData({
    page: PageModel.factory(uri)
  });
};

module.exports = PageController;