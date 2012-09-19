module.exports = exports = [
  {
    uri: '/post/:uri',
    config: {
      'controller': 'post'
    }
  },
  {
    uri: '/:controller?/:action?/:id?'
  }
];