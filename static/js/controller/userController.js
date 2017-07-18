define(function(require) {
  var Ember = require('ember');
  var Q = require('Q');
  var dctx = require('../model/datacontext');

  return Ember.Controller.extend({
    actions: {
      logout: function() {
        var _this = this;
        FB && FB.logout(function() {
          _this.send('doLogout');
        });
      }
    },

    findUser: function() {
      return dctx.downloadUser().then(function(r) {
        return Q.resolve(Ember.getWithDefault(r, 'results.0', {}));
      });
    }
  });
});
