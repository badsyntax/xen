var siteConfig = require('../config/site');
var htmlFormatter = require('../lib/stylehtml');

module.exports = {

  defaultController: 'page',
  defaultAction: 'index',
  cacheRequests: true,
  cache: {},

  setup: function(app) {
    this.app = app;
    this.setupRedirects();
    this.setupRoutes();
  },

  setupRedirects: function() {

    var redirects = require('../routes/redirects');

    function redirect(app, from, to) {
      app.get(from, function(req, res) {
        res.redirect(301, to); 
      });
    }

    for(var i = 0, l = redirects.length; i < l; i++) {
      redirect(this.app, redirects[i].from, redirects[i].to);
    }
  },

  getRouteFromRequest: function(req) {

    if (!req.params) {
      return null;
    }

    var controller = req.params.controller || '';
    var action = req.params.action || this.defaultAction;
    action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

    return {
      controller: controller,
      action: action
    };
  },

  cacheRequest: function(req, res) {

    if (!this.cacheRequests || req.method !== 'GET') {
      return false;
    }

    // Find the request entry in the cache
    var cacheEntry = this.cache[req.url];
    if (cacheEntry) {
      res.send(cacheEntry.body, cacheEntry.headers, cacheEntry.status);
      return true;
    }

    var send = res.send;
    res.send = function(body, headers, status){
      
      // Beautify the html
      if (siteConfig.beautifyHtml.enabled) {
        body = htmlFormatter(String(body), siteConfig.beautifyHtml.config);
      }

      // Store the request in cache
      this.cache[req.url] = {
        body: body,
        headers: headers,
        status: status
      };

      send.apply(res, arguments);
    
    }.bind(this);

    return false;
  },

  clearCache: function() {
    this.cache = {};
    require.cache = {};
  },

  route: function(route) {

    return function(req, res) {

      if (this.cacheRequest(req, res)) {
        return;
      }      

      req.route = route || this.getRouteFromRequest(req);

      if (!req.route) {
        return res.send(404);
      }

      var controllers = require('fs').readdirSync(__dirname + '/../controllers/');
      var foundController = controllers.indexOf(req.route.controller + '.js') !== -1;
      var controllerName = foundController ? req.route.controller : this.defaultController;
      var Controller = require('../controllers/' + controllerName);

      req.route.controller = controllerName;

      new Controller(this.app, req, res);

    }.bind(this);
  },

  setupRoutes: function() {
    
    var app = this.app;

    app.get('/*', function(req, res, next) {
      if (req.query && req.query.recache !== undefined) {
        this.clearCache();
      }
      next();
    }.bind(this));
    app.all('/post/:uri', this.route({ 'controller': 'post' }));
    app.all('/:controller?/:action?/:id?', this.route());
  }
};