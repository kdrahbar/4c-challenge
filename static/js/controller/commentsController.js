define(function(require) {
  var Ember = require('ember');
  var Q = require('Q');
  var dctx = require('../model/datacontext');

  return Ember.Controller.extend({
    findComments: function(post_id) {
      return dctx.downloadComments(post_id).then(
        function(r) {
          return Q.resolve(Ember.getWithDefault(r, 'results.0', {}));
        }
      );
    }
  });
});


// define(function(require) {
//   var Ember = require('ember');

//   return Ember.Controller;
// });
