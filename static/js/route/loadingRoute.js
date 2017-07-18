define(function(require) {
  var Ember = require('ember');
  var App = require('app');

  return App.registerRoute('loading', {
    template: '<div class="loading"><div class="loading-message"></div></div>',
    route: Ember.Route
  });
});
