var Validator = requireRoot('/lib/validator');
var PageController = require('./page');
var nodemailer = require("nodemailer");
var siteConfig = require('../config/site');

function ContactController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(ContactController, PageController);

ContactController.prototype.actionIndex = function() {

  PageController.prototype.actionIndex.apply(this, arguments);

  if (this.req.method === 'POST') {

    var data = {
      name: this.req.param('name'),
      email: this.req.param('email'),
      message: this.req.param('message')
    };

    var validator = new Validator(data);

    validator.rule('name', 'notEmpty', '- must not be empty');
    validator.rule('email', 'notEmpty', '- must not be empty');
    validator.rule('email', 'isEmail', '- must be a valid email');
    validator.rule('message', 'notEmpty', '- must not be empty');

    var errors = validator.check();
    var message = null;

    if (errors) {
      message = {
        type: 'error',
        friendlytype: 'Error',
        content: 'Please correct the fields below.'
      };
    } else {

      data = {};
      message = {
        type: 'success',
        friendlytype: 'Success',
        content: 'Message successfully sent.'
      };

      this.sendEmail(data);
      //this.res.redirect(this.req.url);
    }

    this.layout.setData({
      message: message,
      errors: errors,
      data: data
    });
  }
};

ContactController.prototype.sendEmail = function(data) {

  var transport = nodemailer.createTransport("Sendmail");
  var mailOptions = siteConfig.email;
  
  mailOptions.text = [
    'From: '      + data.name,
    "\rEmail: "   + data.email,
    "\rMessage: " + data.message
  ].join('');

  transport.sendMail(mailOptions);
};

module.exports = ContactController;