module.exports = (function() {

  var router = {

    defaultController: 'page',
    defaultAction: 'index',
    cacheRequests: true,
    cache: {},

    setup: function(app, config, routes, redirects) {
      this.app = app;
      this.redirects = redirects || requireApp('/routes/redirects');
      this.routes = routes || requireApp('/routes/routes');
      this.config = config || requireApp('/config/site');

      this.setupRedirects();
      this.setupRoutes();
    },

    setupRedirects: function() {

      var redirects = this.redirects;

      for(var i = 0, l = redirects.length; i < l; i++) {
        this.redirect(this.app, redirects[i].from, redirects[i].to);
      }
    },

    setupRoutes: function() {
      
      var app = this.app;

      app.get('/*', function(req, res, next) {
        if (req.query && req.query.recache !== undefined) {
          this.clearCache();
        }
        next();
      }.bind(this));

      console.log(this.routes);

      this.routes.forEach(function(route){
        app.all(route.uri, this.route(route.config));
      }.bind(this));
    },

    redirect: function(from, to) {
      this.app.get(from, function(req, res) {
        res.redirect(301, to); 
      });
    },

    formatBody: function(body) {
      // Beautify the html
      if (this.config.beautifyHtml.enabled) {
        body = requireRoot('/lib/stylehtml')(String(body), this.config.beautifyHtml.config);
      }
      return body;
    },

    cacheRequest: function(body, headers, status, req) {
      this.cache[req.url] = {
        body: body,
        headers: headers,
        status: status
      };
    },

    isRequestCached: function(req, res) {
      if (!this.cacheRequests || req.method !== 'GET') {
        return false;
      } else if (this.cacheRequests && !this.cache[req.url]) {
        this.cacheBody(req, res);
        return false;
      } else {
        return true;
      }
    },

    cacheBody: function(req, res) {
      var send = res.send;
      res.send = function(body, headers, status){
        body = this.formatBody(body);
        this.cacheRequest(body, headers, status, req);
        send.apply(res, arguments);
      }.bind(this);
    },

    clearCache: function() {
      this.cache = {};
      require.cache = {};
    },

    sendCachedRequest: function(req, res) {
      var cacheEntry = this.cache[req.url];
      return res.send(cacheEntry.body, cacheEntry.headers, cacheEntry.status);
    },

    getRouteFromRequest: function(req) {

      if (!req.params) {
        return false;
      }

      var controller = req.params.controller || '';
      var action = req.params.action || this.defaultAction;
      
      action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

      return {
        controller: controller,
        action: action
      };
    },

    routeUrlToController: function(route, req, res) {

      req.route = route || this.getRouteFromRequest(req);

      if (!req.route) {
        return res.send(404);
      }

      var controllers = require('fs').readdirSync(appDir() + '/controllers/');
      var foundController = controllers.indexOf(req.route.controller + '.js') !== -1;
      var controllerName = foundController ? req.route.controller : this.defaultController;
      var Controller = requireApp('/controllers/' + controllerName);

      req.route.controller = controllerName;

      new Controller(this.app, req, res);
    },

    route: function(route) {

      return function(req, res) {

        if (this.isRequestCached(req, res)) {
          return this.sendCachedRequest(req, res);
        }

        this.routeUrlToController(route, req, res);

      }.bind(this);
    },
  };

  return router.setup.bind(router);
  
})();