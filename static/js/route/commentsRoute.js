define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  return App.registerRoute('comments', {
    view: require('../view/commentsView'),
    controller: require('../controller/commentsController'),
    route: Ember.Route.extend({
      model: function(params, transition) {
        return this.controllerFor('comments').findComments(transition.params["post_id"]);
      },
      
      renderTemplate: function() {
        this.render({ into: 'post'});
      }
    })
  });
});
