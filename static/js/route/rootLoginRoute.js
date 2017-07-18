define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  return App.registerRoute('rootLogin', {
    view: require('../view/rootLoginView'),
    route: Ember.Route.extend({
      actions: {
        doLogin: function() {
          this.transitionTo('posts');
        }
      },

      renderTemplate: function() {
        this.render({ outlet: 'user' });
      }
    })
  });
});
