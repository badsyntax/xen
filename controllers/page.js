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

PageController.prototype.actionIndex = function() {};

PageController.prototype.getPageModel = function() {

  if (this.page !== undefined) {
    return this.page;
  }

  var uri = (this.req.route.contentUri || this.req.url.replace('/', '')).replace(/\?.*$/, '');

  var record = new DataStore('pages').where(function(page){
    return page.uri === uri;
  }).find()[0];

  if (!record) {
    return false;
  }

  return new PageModel( record );
};

PageController.prototype.before = function() {
  this.viewModel = ViewModel.factory('layout');
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
    app: this.app,
    route: this.req.route,
    page: pageModel,
    breadcrumbs: this.breadcrumbs
  });

  this.viewModel.compile();

  this.res.render(pageModel.view, this.viewModel.getData());
};

module.exports = PageController;