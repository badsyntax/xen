module.exports = {
  name: 'Site name',
  theme: 'bootstrap',  
  email: {
      from: 'root@example.com',
      to:'youremail@example.com',
      subject: "New message!"
  },
  disqus: {
    disqus_developer: true,
    disqus_shortname: 'USERNAME'
  },
  analytics: {
    account: 'UA-XXXXXXX-XX'
  },
  googleplus: {
    lang: 'en-GB' 
  },
  twitter: {
    username: false
  },
  beautifyHtml: {
    enabled: true,
    config: {
      'indent_size': 2,
      'max_char': 0,
      'unformatted': [
        'bdo', 
        'em', 
        'strong', 
        'dfn', 
        'code', 
        'samp', 
        'kbd', 
        'var', 
        'cite', 
        'abbr', 
        'acronym', 
        'q', 
        'sub', 
        'sup', 
        'tt', 
        'i', 
        'b', 
        'small', 
        'u', 
        's', 
        'strike', 
        'font', 
        'ins', 
        'del', 
        'pre', 
        'address'
      ]
    }
  }
};