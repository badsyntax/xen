var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');
var View = require('../lib/view');
var Assets = require('../lib/assets');
var Theme = require('../lib/theme');
var ViewModel = require('../lib/viewmodel');
var siteConfig = require('../config/site');
var themeConfig = require('../themes/' + siteConfig.theme + '/config');

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

PageController.prototype.after = function() {

  BaseController.prototype.after.apply(this, arguments);

  var pageModel = this.getPageModel();

  if (!pageModel) {
    return this.res.send(404);
  }

  var controller = this.req.route.controller;
  controller = controller.charAt(0).toUpperCase() + controller.slice(1);

  Theme.setConfig('script', {
    trackPage: true || this.app.address().address !== '127.0.0.1' // FIXME
  });

  this.breadcrumbs.push({
    uri: this.req.url,
    title: pageModel.title,
    last: true
  });

  this.view.navigation = (new ViewModel.factory('fragments/navigation', {
    page: pageModel
  })).render();

  this.view.breadcrumbs = (new ViewModel.factory('fragments/breadcrumbs', { 
    breadcrumbs: this.breadcrumbs
  })).render();

  var assets = new Assets(this.app);  

  this.view.head = (new ViewModel.factory('fragments/head', { 
    siteConfig: siteConfig,
    styles: assets.render('style'),
    page: pageModel
  })).render();

  this.view.scripts = (new ViewModel.factory('fragments/scripts', {
    scripts: assets.render('script'),
    controller: controller,
    config: Theme.getConfigAsStringArray('script')
  })).render();

  this.view.page = pageModel;
  this.res.render(pageModel.view, this.view);
};

module.exports = PageController;