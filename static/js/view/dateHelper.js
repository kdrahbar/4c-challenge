define(function(require) {
  Ember = require('ember');

  Ember.Handlebars.helper('date', function(value, options) {
    var date = new Date(value);
    return isFinite(date) ? date.toLocaleString() : '';
  });
});
