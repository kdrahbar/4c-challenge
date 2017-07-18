define(function(require) {
  var Ember = require('ember');

  var T = Ember.Handlebars.compile('\
    <h4>Post {{model.id}}</h4> \
    {{outlet}} \
  ');

  return Ember.View.extend({
    template: T
  });
});
