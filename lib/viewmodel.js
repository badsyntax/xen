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

ViewModel.prototype.compile = function() {
  
  var data = {};
  var baseKeys = Object.keys(ViewModel.prototype);

  for(var key in this) {
    if (baseKeys.indexOf(key) !== -1) {
      continue;
    }
    if (typeof this[key] === 'function') {
      data[key] = this[key].bind(this);
    } else {
      data[key] = this[key];
    }
  }

  this.setData(data);
};

ViewModel.prototype.render = function() {
  this.compile();
  return this.view.render();
};

module.exports = exports = ViewModel;