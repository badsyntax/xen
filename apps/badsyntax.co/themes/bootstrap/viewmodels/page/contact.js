var ViewModel = requireRoot('/xen/viewmodel');
var Blog = requireRoot('/xen/blog');

function Contact(data) {
  ViewModel.apply(this, arguments); 
}
require('util').inherits(Contact, ViewModel);

module.exports = exports = Contact;