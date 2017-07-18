define(function(require) {
  Ember = require('ember');

  App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    _readinessDeferrals: 2,

    registerRoute: function(key, params) {
      params = params || {};
      Ember.assert('key must be specified', key);
      Ember.assert('route must be specified', params.route);

      var prefix = key.replace('/','_').camelize().capitalize();
      var routeName = '%@Route'.fmt(prefix);
      Ember.assert('route name collision', this.get(routeName) === undefined);
      this.set(routeName, params.route);

      if (params.controller !== undefined) {
        var controllerName = '%@Controller'.fmt(prefix);
        Ember.assert('controller name collision', this.get(controllerName) === undefined);
        this.set(controllerName, params.controller);
      }

      if (params.view !== undefined) {
        var viewName = '%@View'.fmt(prefix);
        Ember.assert('view name collision', this.get(viewName) === undefined);
        this.set(viewName, params.view);
      }

      if (params.template !== undefined) {
        var templateName = key;
        Ember.assert('template name collision', Ember.TEMPLATES[templateName] === undefined);
        Ember.TEMPLATES[templateName] = Ember.Handlebars.compile(params.template);
      }
    }
  });

  require(['./route/map'], function(map) {
    App.Router.map(map);
    App.advanceReadiness();
  });

  return App;
});
