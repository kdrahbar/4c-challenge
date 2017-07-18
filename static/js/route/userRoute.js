define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  return App.registerRoute('user', {
    view: require('../view/userView'),
    controller: require('../controller/userController'),
    route: Ember.Route.extend({
      actions: {
        doLogout: function() {
          this.transitionTo('root.login');
        }
      },
      model: function(params, transition) {
        var _this = this;
        return this.controllerFor('user').findUser().fail(function() {
          _this.replaceWith('root.login');
        });
      },
      renderTemplate: function() {
        this.render({ outlet: 'user' });
      }
    })
  });
});
