define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  App.registerRoute('rootIndex', {
    route: Ember.Route.extend({
      redirect: function() {
        this.transitionTo('posts');
      }
    })
  });

  return App.registerRoute('root', {
    view: require('../view/rootView'),
    route: Ember.Route
  });
});
