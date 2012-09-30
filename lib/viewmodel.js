var View = require('./view');

function ViewModel(path, data, theme) {
  this.view = new View(path, data, theme);
}

ViewModel.factory = function(path, data, theme) {
  
  var VM;
  var vmPath = [
    appDir(),
    'themes',
    requireApp('/config/site').theme,
    'viewmodels',
    path
  ].join('/');

  VM = require(vmPath);

  return new VM(path, data, theme);
};

ViewModel.prototype.getPath = function() {
  return this.view.path;
};

ViewModel.prototype.setData = function() {
  this.view.setData.apply(this.view, arguments);
};

ViewModel.prototype.getData = function() {
  return this.view.getData.apply(this.view, arguments);
};

ViewModel.prototype.compile = function(callback) {
  
  var viewModel = this;
  var viewData = {};
  var baseKeys = Object.keys(ViewModel.prototype);
  var methods = [];

  function runAsyncMethods() {

    if (!methods.length) {
      viewModel.setData(viewData);
      return callback();
    }

    var methodsExecuted = 0;
    var totalMethods = methods.length;

    methods.forEach(function(method){
      (function(method) {
        method.func(function(data){
          methodsExecuted++;
          viewData[method.key] = data;
          if (methodsExecuted === totalMethods) {
            viewModel.setData(viewData);
            callback();            
          }
       })
      })(method);
    });    
  }

  for(var key in this) {

    if (baseKeys.indexOf(key) !== -1) {
      continue;
    }
    
    if (typeof this[key] === 'function') {
      methods.push({
        key: key,
        func: this[key].bind(this)
      });
    } else {
      viewData[key] = this[key];
    }
  }

  runAsyncMethods();
};

ViewModel.prototype.render = function(callback) {
  this.compile(function(){
    callback(this.view.render());
  }.bind(this));
};

module.exports = exports = ViewModel;