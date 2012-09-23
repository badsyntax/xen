module.exports = (function() {

  var router = {

    defaultController: 'page',
    defaultAction: 'index',

    setup: function(app, config, routes, redirects) {
      this.app = app;
      this.redirects = redirects || requireApp('/routes/redirects');
      this.routes = routes || requireApp('/routes/routes');
      this.config = config || requireApp('/config/site');
      this.setupRedirects();
      this.setupRoutes();
    },

    setupRedirects: function() {
      this.redirects.forEach(function(r) {
        this.redirect(r.from, r.to);
      }.bind(this));
    },

    setupRoutes: function() {
      this.routes.forEach(function(route){
        this.app.all(route.uri, this.route(route.config));
      }.bind(this));
    },

    redirect: function(from, to) {
      this.app.get(from, function(req, res) {
        res.redirect(301, to); 
      });
    },

    route: function(route) {
      return function(req, res) {
        this.routeUrlToController(route, req, res);
      }.bind(this);
    },

    formatBody: function(body) {
      if (this.config.beautifyHtml.enabled) {
        body = requireRoot('/lib/stylehtml')(String(body), this.config.beautifyHtml.config);
      }
      return body;
    },

    getRouteFromRequest: function(req) {

      if (!req.params) return false;

      var action = req.params.action || this.defaultAction;
      
      return {
        controller: req.params.controller || '',
        action: 'action' + action.charAt(0).toUpperCase() + action.slice(1);
      };
    },

    routeUrlToController: function(route, req, res) {

      req.route = route || this.getRouteFromRequest(req);

      if (!req.route) return res.send(404);

      req.route.controller = require('fs')
        .readdirSync(appDir() + '/controllers/')
        .indexOf(req.route.controller + '.js') !== -1 
        ? req.route.controller 
        : this.defaultController;
      
      var Controller = requireApp('/controllers/' + req.route.controller);

      new Controller(this.app, req, res);
    }
  };

  return router.setup.bind(router);
  
})();