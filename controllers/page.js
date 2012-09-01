var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');
var View = require('../lib/view');
var Assets = require('../lib/assets');
var Theme = require('../lib/theme');
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

PageController.prototype.getPage = function() {

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

PageController.prototype.getNavPages = function(uri) {
  return new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    data.active = (data.uri === uri);
    return new PageModel(data);
  });
};

PageController.prototype.after = function() {

  BaseController.prototype.after.apply(this, arguments);

  var page = this.getPage();

  if (!page) {
    this.res.send(404);
    return;
  }

  var isLocal = true || this.app.address().address === '127.0.0.1';
  var assetsDomain = '/';
  var trackPage = true || !isLocal;
  var controller = this.req.route.controller;
  controller = controller.charAt(0).toUpperCase() + controller.slice(1);

  Theme.setConfig('script', {
    trackPage: trackPage
  });

  this.breadcrumbs.push({
    uri: this.req.url,
    title: page.title,
    last: true
  });

  this.view.navigation = new View('fragments/navigation', { 
    siteConfig: siteConfig,
    pages: this.getNavPages(page.uri),
    assetsDomain: assetsDomain
  }).render();
  
  this.view.breadcrumbs = new View('fragments/breadcrumbs', { 
    breadcrumbs: this.breadcrumbs
  }).render();

  this.view.head = new View('fragments/head', { 
    siteConfig: siteConfig,
    styles: new Assets('style').render(),
    page: page
  }).render();

  this.view.scripts = new View('fragments/scripts', {
    scripts: new Assets('script').render(),
    controller: controller,
    config: Theme.getConfigAsStringArray('script')
  }).render();

  this.view.page = page;
  this.res.render(page.view, this.view);
};

module.exports = PageController;