var ViewModel = requireRoot('/lib/viewmodel');
var Blog = requireRoot('/lib/blog');

function Contact(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Contact, ViewModel);

module.exports = exports = Contact;