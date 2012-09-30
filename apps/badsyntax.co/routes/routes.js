module.exports = exports = [
  {
    uri: '/admin/:controller?/:action?/:id?',
    defaults: {
      controller: 'home',
      directory: 'admin'
    }
  },
  {
    uri: '/post/:uri',
    defaults: {
      'controller': 'post'
    }
  },
  {
    uri: '/:controller?/:action?/:id?'
  }
];