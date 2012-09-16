var DataStore = require('../lib/datastore');
var ViewModel = require('../lib/viewmodel');
var PageModel = require('../models/page');

function BaseController(app, req, res) {

  this.app = app;
  this.req = req;
  this.res = res;
  this.viewModel = {};
  this.layoutView = 'layouts/page';

  this.execute();
}

BaseController.prototype.execute = function() {

  var action = this.req.route.action || 'actionIndex';

  if (this[action] === undefined) {
    this.res.send(404);
    return;
  }

  this.before();
  this[action]();
  this.after();
};

BaseController.prototype.before = function(){
  this.layout = ViewModel.factory('layout', {
    app: this.app,
    req: this.req
  });
};

BaseController.prototype.after = function(){
  this.layout.compile();
  this.res.render(this.layout.getPath(), this.layout.getData());
};

module.exports = BaseController;