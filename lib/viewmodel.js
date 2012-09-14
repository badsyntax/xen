var View = require('./view');

function ViewModel(path, data, theme) {
  this.view = new View(path, data, theme);
}

ViewModel.factory = function(path, data, theme) {
  
  var vmPath = __dirname + '/../themes/' + require('../config/site').theme + '/viewmodels/' + path;

  try {
    var VM = require(vmPath);
  } catch(e) {
    var VM = ViewModel;
    console.log('Error: unable to find viewmodel ' + vmPath);
  }
  
  return new VM(path, data, theme);
};

ViewModel.prototype.render = function() {
  return this.view.render();
};

module.exports = exports = ViewModel;