define(function(require) {
  var Ember = require('ember');

  var T = Ember.Handlebars.compile('\
    <div {{bindAttr class=":fb-login-wrap user:hidden"}}> \
      <div class="fb-login-button" data-show-faces="false" data-max-rows="1" data-autologoutlink="true" data-scope="user_posts,publish_actions"></div> \
    </div> \
  ');

  return Ember.View.extend({
    template: T,
    
    didInsertElement: function() {
      this._super();

      var handler = (function(context) {
        return function() {
          if (window.FB_INITIALIZED) {
            FB.getLoginStatus(function(response) {
              if (context.state === 'inDOM') {
                var status = response.status;
                if (status == 'connected') {
                  context.get('controller').send('doLogin');
                }
              }
            });
          }
        };
      })(this);

      this.set('_fbAuthHandler', handler);

      var setupFBAuth = function() {
        FB.Event.subscribe('auth.statusChange', handler);
        handler();
      };

      if (window.FB_INITIALIZED) {
        FB.XFBML.parse();
        setupFBAuth();
      } else {
        window.ON_FB_INITIALIZED = setupFBAuth;
      }    
    }
  });
});
