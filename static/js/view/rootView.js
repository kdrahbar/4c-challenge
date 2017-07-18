define(function(require) {
  var Ember = require('ember');
  require('bootstrap');

  var T = Ember.Handlebars.compile('\
    <nav class="navbar navbar-default navbar-inverse" role="navigation"> \
      <div class="navbar-header"> \
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-collapse"> \
          <span class="sr-only">Toggle navigation</span> \
          <span class="icon-bar"></span> \
          <span class="icon-bar"></span> \
          <span class="icon-bar"></span> \
        </button> \
        <div class="navbar-brand">Facebook Post Monitor</div> \
      </div> \
      <div class="collapse navbar-collapse" id="nav-collapse"> \
        <ul class="nav navbar-nav pull-right"> \
          <li class="navbar-brand">{{outlet user}}</li> \
        </ul> \
      </div> \
    </nav> \
    {{outlet posts}} \
  ');

  return Ember.View.extend({
    template: T
  });
});
