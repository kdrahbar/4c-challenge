define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  App.registerRoute('postIndex', {
    route: Ember.Route.extend({
      beforeModel: function(transition) {
        console.log(transition.params["post_id"]);
        this.transitionTo('comments', transition.params["post_id"]);
      }
      // redirect: function(transition) {
      //   console.log(transition.params);
      //   this.transitionTo('comments');
      // }
    })
  });

  return App.registerRoute('post', {
    view: require('../view/postView'),
    controller: require('../controller/postController'),
    route: Ember.Route.extend({
      model: function(params, transition) {
        return this.controllerFor('post').findPost(params.post_id);
      },
      renderTemplate: function() {
        this.render({ into: 'root', outlet: 'posts' });
      }      
    })
  });
});
