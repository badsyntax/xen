/*global $:false, _:false*/

/**********************
 * Home controller
 **********************/
App.Controllers.Home = function() {
  App.Controllers.Page.apply(this, arguments);
};

App.Util.inherits(App.Controllers.Home, App.Controllers.Page);