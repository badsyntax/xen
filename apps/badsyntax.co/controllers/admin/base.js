var PostModel = require('../../models/post');
var BaseController = require('../base');

function AdminBaseController() { 
  this.layoutView = 'admin/layout';
  BaseController.apply(this, arguments); 
}
require('util').inherits(AdminBaseController, BaseController);

AdminBaseController.prototype.actionIndex = function(){ 
  this.layout.setData({
  });
};

module.exports = AdminBaseController;