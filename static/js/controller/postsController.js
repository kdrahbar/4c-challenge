define(function(require) {
  var Ember = require('ember');
  var Q = require('Q');
  var dctx = require('../model/datacontext');

  return Ember.Controller.extend({
    findPosts: function() {
      return dctx.downloadPosts().then(function(r) {
        return Q.resolve(Ember.getWithDefault(r, 'results', []));
      });
    }
  });
});
