define(function(require) {
  var Ember = require('ember');

  var T = Ember.Handlebars.compile('\
    <h4>Comments</h4> \
    <table class="table table-striped table-hover"> \
      <thead><th>Date</th><th>Comment</th><th>From</th></tr></thead> \
      <tbody> \
        {{#each post in model}} \
          <td>{{date post.created_time}}</td> \
          <td>{{post.message}}</td> \
          <td>{{post.from.name}}</td> \
          </tr> \
        {{/each}} \
      </tbody> \
    </table> \
    <div class="well"> \
      This section should display a list of recent comments for the active post, and allow the user to \
      delete a comment with the click of a button. \
    </div> \
  ');

  return Ember.View.extend({
    template: T
  });
});
