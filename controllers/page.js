var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');
var View = require('../lib/view');

function PageController() { 

  this.breadcrumbs = this.breadcrumbs || [{
    url: '/',
    title: 'Home'
  }];

  BaseController.apply(this, arguments); 
};
require('util').inherits(PageController, BaseController);

PageController.prototype.actionIndex = function() {
  return true;
};

PageController.prototype.getPage = function() {

  if (this.page !== undefined) {
    return this.page;
  }

  var uri = (this.req.route.contentUri || this.req.url.replace('/', '')).replace(/\?.*$/, '');

  var record = new DataStore('pages').where(function(page){
    return page.uri == uri
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
    data.active = (data.uri == uri);
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

  var assetsDomain = true || this.app.address().address === '127.0.0.1' ? '/' : '//assets.badsyntax.co/';
  var controller = this.req.route.controller.charAt(0).toUpperCase() + this.req.route.controller.slice(1);
  var trackPage = true || this.app.address().address !== '127.0.0.1';

  this.breadcrumbs.push({
    uri: this.req.url,
    title: page.title,
    last: true
  });

  this.view.navigation = new View('fragments/navigation', { 
    pages: this.getNavPages(page.uri),
    assetsDomain: assetsDomain
  }).render();
  
  this.view.breadcrumbs = new View('fragments/breadcrumbs', { 
    breadcrumbs: this.breadcrumbs
  }).render();

  this.view.head = new View('fragments/head', { 
    assetsDomain: assetsDomain,
    page: page
  }).render();

  this.view.scripts = new View('fragments/scripts', {
    assetsDomain: assetsDomain,
    controller: controller,
    config: {
      trackPage: trackPage
    }
  }).render();

  this.view.page = page;
  this.res.render(page.view, this.view);
}

module.exports = PageController;