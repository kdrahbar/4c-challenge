define(function(require) {
  var breeze = require('breeze');
  require('./modelLibrary');
  require('./ajaxAdapter');
  require('./dataService');

  breeze.config.initializeAdapterInstance('modelLibrary', 'emberBackingStore', true);
  breeze.config.initializeAdapterInstance('ajax', 'facebook', true);
  breeze.config.initializeAdapterInstance('dataService', 'facebook', true);

  var ds = new breeze.DataService({
    serviceName: 'https://graph.facebook.com',
    adapterName: 'facebook',
    hasServerMetadata: false,
    useJsonp: false
  });

  var manager = new breeze.EntityManager({dataService: ds});

  var models = {
    User: require('./User'),
    Post: require('./Post')
  };

  for(key in models) {
    if (models.hasOwnProperty(key)) models[key].initialize(manager.metadataStore);
  }

window.manager = manager;

  return {
    downloadUser: function() {
      return models.User.downloadUser(manager);
    },
    downloadPosts: function() {
      return models.Post.downloadPosts(manager);
    },
    downloadPost: function(post_id) {
      return models.Post.downloadPost(manager, post_id);
    },
    downloadComments: function(post_id) {
      return models.Post.downloadComments(manager, post_id);
    }
  };
});
