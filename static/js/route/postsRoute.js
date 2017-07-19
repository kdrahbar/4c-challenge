define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  return App.registerRoute('posts', {
    view: require('../view/postsView'),
    controller: require('../controller/postsController'),
    route: Ember.Route.extend({
      actions: {
        showPost: function(post) {
          console.log(post.id)
          this.transitionTo('post', post.id);
        }
      },
      model: function(params, transition) {
        return this.controllerFor('posts').findPosts();
      },
      renderTemplate: function() {
        this.render({ into: 'root', outlet: 'posts' });
      }    
    })
  });
});
