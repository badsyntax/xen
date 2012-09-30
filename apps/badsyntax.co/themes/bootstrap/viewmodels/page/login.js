var ViewModel = requireRoot('/lib/viewmodel');

function Login(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Login, ViewModel);

module.exports = exports = Login;