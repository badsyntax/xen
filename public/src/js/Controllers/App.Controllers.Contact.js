/*global $:false, _:false*/

/**********************
 * Contact controller
 **********************/
App.Controllers.Contact = function() {
  App.Controllers.Page.apply(this, arguments);
  this.bindEvents();
  this.focusForm();
};

App.Util.inherits(App.Controllers.Contact, App.Controllers.Page);

App.Controllers.Contact.prototype.initPlugins = function() {

  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  
  $('.social-icons').tooltip({
      selector: 'a[rel=tooltip]',
      placement: 'bottom'
  });
};

App.Controllers.Contact.prototype.bindEvents = function() {
  $('.alert').on('click', '.close', $.proxy(this, 'onAlertsCloseButtonClick'));
};

App.Controllers.Contact.prototype.onAlertsCloseButtonClick = function(e) {
  $(e.currentTarget).parent().hide();
};

App.Controllers.Contact.prototype.focusForm = function() {
  $('.contact-form').find(':text,textarea').each(this.focusField);
};

App.Controllers.Contact.prototype.focusField = function() {

  var isEmpty = $.trim(this.value) === '';
  var hasError = $(this).parents('.control-group').hasClass('error');

  if ( isEmpty || hasError ) {
    this.focus();
    return false;
  }
};