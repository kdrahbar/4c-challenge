define(function(require) {
  require('./loadingRoute');
  require('./rootRoute');
  require('./rootLoginRoute');
  require('./userRoute');
  require('./postsRoute');
  require('./postRoute');
  require('./commentsRoute');

  return function() {
    this.resource('root', {path: '/'}, function() {
      this.route('login', {path: '/login'});
      this.resource('user', {path: '/me'}, function() {
        this.resource('posts', {path: '/posts'});
        this.resource('post', {path: '/:post_id'}, function() {
          this.resource('comments', {path: '/comments'});
        });
      });
    });
  };
});
