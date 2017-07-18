define(function(require) {
  var Ember = require('ember');
  require('./dateHelper');

  var T = Ember.Handlebars.compile('\
    <h4>Posts</h4> \
    <table class="table table-striped table-hover"> \
      <thead><tr><th></th><th>Date</th><th>Picture</th><th>Message</th><th>Link</th><th>Source</th></tr></thead> \
      <tbody> \
        {{#each post in model}} \
          <tr style="cursor:pointer;" {{action showPost post}}> \
            <td><img {{bindAttr src=post.icon}}></td> \
            <td>{{date post.created_time}}</td> \
            <td><img class="pic-thumbnail" {{bindAttr src=post.picture}}></td> \
            <td>{{post.message}}</td> \
            <td><a {{bindAttr href=post.link}}>{{post.name}}</a></td> \
            <td><a {{bindAttr href=post.source}}>{{post.source}}</a></td> \
          </tr> \
        {{/each}} \
      </tbody> \
    </table> \
  ');

  return Ember.View.extend({
    template: T
  });
});
