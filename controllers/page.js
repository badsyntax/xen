var DataStore = require('../lib/datastore');
var BaseController = require('./base');
var ViewModel = require('../lib/viewmodel');

function PageController() { 
  BaseController.apply(this, arguments); 
}

require('util').inherits(PageController, BaseController);

PageController.prototype.actionIndex = function() {};

module.exports = PageController;