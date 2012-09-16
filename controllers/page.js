var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');
var ViewModel = require('../lib/viewmodel');

function PageController() { 
  this.breadcrumbs = this.breadcrumbs || [{
    url: '/',
    title: 'Home'
  }];
  BaseController.apply(this, arguments); 
}

require('util').inherits(PageController, BaseController);

PageController.prototype.before = function() {
  this.viewModel = ViewModel.factory('layout', {
    app: this.app,
    req: this.req
  });
};

PageController.prototype.actionIndex = function() {};

PageController.prototype.getPageModel = function() {

  var uri = (this.req.route.contentUri || this.req.url.replace('/', ''));
  uri = uri.replace(/\?.*$/, ''); // remove query string

  return this.page || PageModel.factory(uri);
};

PageController.prototype.after = function() {

  BaseController.prototype.after.apply(this, arguments);

  var pageModel = this.getPageModel();

  if (!pageModel) {
    return this.res.send(404);
  }

  this.breadcrumbs.push({
    uri: this.req.url,
    title: pageModel.title,
    last: true
  });

  this.viewModel.setData({
    page: pageModel,
    crumbs: this.breadcrumbs
  });

  this.viewModel.compile();
  var layoutViewData = this.viewModel.getData();

  this.res.render(pageModel.view, layoutViewData);
};

module.exports = PageController;