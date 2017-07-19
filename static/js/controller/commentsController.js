define(function(require) {
  var Ember = require('ember');
  var Q = require('Q');
  var dctx = require('../model/datacontext');

  return Ember.Controller.extend({
    findComments: function(post_id) {
      return dctx.downloadComments(post_id).then(
        function(r) {
          console.log(r)
          return Q.resolve(Ember.getWithDefault(r, 'results', []));
        }
      );
    }
  });
});


// define(function(require) {
//   var Ember = require('ember');
//   console.log("shnibddass")
//   return Ember.Controller;
// });
