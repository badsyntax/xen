var BaseController = require('./base');

function LoginController() { 
  this.layoutView = 'layouts/login';
  BaseController.apply(this, arguments); 
}
require('util').inherits(LoginController, BaseController);

LoginController.prototype.actionIndex = function() {
  this.layout.setGlobalData({
    title: 'Login'
  });
};

module.exports = LoginController;