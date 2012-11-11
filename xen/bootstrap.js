module.exports = (function() {

  var Cache = requireRoot('/xen/cache');
  var FileSystem = requireRoot('/xen/filesystem');
  var appRedirects = requireApp('/routes/redirects');
  var appRoutes = requireApp('/routes/routes');
  var appConfig = requireApp('/config/site');
  var defaultController = 'page';
  var defaultAction = 'index';

  var bootstrap = {

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
        this.app.all(route.uri, this.route(route));
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
        body = requireRoot('/xen/stylehtml')(String(body), this.config.beautifyHtml.config);
      }
      return body;
    },

    cloneObject: function(obj) {
      var newObj = {};
      if (obj) {
        for(var key in obj) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    },

    getControllersOnFileSystem: function() {
      return FileSystem.listFiles(appDir() + '/controllers');
    },

    getControllerAndACtionFromRoute: function(route, req) {

      if (route.controller && route.directory) {
        route.controller = route.directory + '/' + route.controller;
      }

      var controller = route.controller || req.params.controller || '';

      var action = route.action || req.params.action || defaultAction;
      action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

      return {
        controller: controller,
        action: action
      };
    },

    routeUrlToController: function(route, req, res) {

      var defaultRoot = this.cloneObject(route.defaults);

      req.route = this.getControllerAndACtionFromRequest(defaultRoot, req);

      Cache.get('controllers', function(controllers){

        if (!controllers) {
          controllers = this.getControllersOnFileSystem();
          Cache.set('controllers', JSON.stringify(controllers));
        } else {
          controllers = JSON.parse(controllers);
        }

        req.route.controller = controllers.indexOf(req.route.controller + '.js') !== -1 
          ? req.route.controller 
          : defaultController;

        var Controller = requireApp('/controllers/' + req.route.controller);
        
        new Controller(this.app, req, res);

      }.bind(this));
    }
  };

  return bootstrap.setup.bind(bootstrap);
  
})();