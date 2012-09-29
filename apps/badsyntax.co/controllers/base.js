var Controller = requireRoot('/lib/controller');
var Cache = requireRoot('/lib/cache');

function BaseController(app, req, res) { 

  if (req.query.recache !== undefined) {
    Cache.flush();
  }

  Controller.apply(this, arguments); 
}

require('util').inherits(BaseController, Controller);

module.exports = BaseController;