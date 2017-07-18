define(function(require) {
  var Ember = require('ember');

  var T = Ember.Handlebars.compile('\
    {{model.name}} \
    <span {{action logout}} class="logout-user glyphicon glyphicon-log-out" title="logout"></span> \
  ');

  return Ember.View.extend({
    template: T
  });
});
