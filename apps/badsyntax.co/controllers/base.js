var Controller = requireRoot('/xen/controller');
var Cache = requireRoot('/xen/cache');

function BaseController(app, req, res) { 

  if (req.query.recache !== undefined) {
    Cache.flush();
  }

  Controller.apply(this, arguments); 
}

require('util').inherits(BaseController, Controller);

module.exports = BaseController;