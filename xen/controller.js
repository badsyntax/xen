var ViewModel = requireRoot('/xen/viewmodel');

function Controller(app, req, res) {
  this.app = app;
  this.req = req;
  this.res = res;
  this.layoutView = this.layoutView || 'layout';
  this.execute();
}

Controller.prototype.execute = function() {

  var action = this.req.route.action || 'actionIndex';

  if (this[action] === undefined) {
    console.error('Controller action not found: ' + action);
    this.res.send(404);
    return;
  }

  this.before();
  
  if (this[action]() !== false) {
    this.after();
  }
};

Controller.prototype.before = function(){
  this.layout = ViewModel.factory(this.layoutView, {
    app: this.app,
    req: this.req
  });
};

Controller.prototype.after = function(){
  this.layout.compile(function(){
    this.res.render(this.layout.getPath(), this.layout.getData());
  }.bind(this));
};

module.exports = Controller;