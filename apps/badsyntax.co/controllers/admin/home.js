var BaseController = require('./base');

function AdminHomeController() { 
  console.log('admn home controller');
  BaseController.apply(this, arguments); 
}
require('util').inherits(AdminHomeController, BaseController);

module.exports = AdminHomeController;