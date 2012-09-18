var ViewModel = require('../lib/viewmodel');

function Controller(app, req, res) {
  this.app = app;
  this.req = req;
  this.res = res;
  this.layoutView = 'layout';
  this.execute();
}

Controller.prototype.execute = function() {

  var action = this.req.route.action || 'actionIndex';

  if (this[action] === undefined) {
    this.res.send(404);
    return;
  }

  this.before();
  this[action]();
  this.after();
};

Controller.prototype.before = function(){
  this.layout = ViewModel.factory(this.layoutView, {
    app: this.app,
    req: this.req
  });
};

Controller.prototype.after = function(){
  this.layout.compile();
  this.res.render(this.layout.getPath(), this.layout.getData());
};

module.exports = Controller;