module.exports = (function() {

  var Cache = requireRoot('/lib/cache');
  var appRedirects = requireApp('/routes/redirects');
  var appRoutes = requireApp('/routes/routes');
  var appConfig = requireApp('/config/site');
  var defaultController = 'page';
  var defaultAction = 'index';

  var router = {

    setup: function(app, config, routes, redirects) {
      this.app = app;
      this.redirects = redirects || appRedirects;
      this.routes = routes || appRoutes;
      this.config = config || appConfig;
      this.setupRedirects();
      this.setupRoutes();
    },

    setupRedirects: function() {
      this.redirects.forEach(function(r) {s
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

      var action = req.params.action || defaultAction;

      return {
        controller: req.params.controller || '',
        action: 'action' + action.charAt(0).toUpperCase() + action.slice(1)
      };
    },

    routeUrlToController: function(route, req, res) {

      req.route = route || this.getRouteFromRequest(req);

      if (!req.route) return res.send(404);

      Cache.get('controllers', function(controllers){
        
        if (!controllers) {
          controllers = require('fs').readdirSync(appDir() + '/controllers/');
          Cache.set('controllers', controllers);
        }

        req.route.controller = 
          controllers.indexOf(req.route.controller + '.js') !== -1 
          ? req.route.controller 
          : defaultController;
        
        var Controller = requireApp('/controllers/' + req.route.controller);

        new Controller(this.app, req, res);

      }.bind(this));
    }
  };

  return router.setup.bind(router);
  
})();