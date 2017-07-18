define(function(require) {
  requirejs.config({
    "baseUrl": "js",
    "waitSeconds": 0,
    "paths": {
      "app":                "app",
      "bootstrap":          "../lib/js/bootstrap",
      "breeze":             "../lib/js/breeze",
      "ember":              "../lib/js/ember-1.1.2",
      "handlebars":         "../lib/js/handlebars-1.0.0",
      "IPv6":               "../lib/js/IPv6",
      "jquery":             "../lib/js/jquery-1.9.1",
      "punycode":           "../lib/js/punycode",
      "Q":                  "../lib/js/q",
      "SecondLevelDomains": "../lib/js/SecondLevelDomains",
      "URI":                "../lib/js/URI"
    },
    "shim": {
      "bootstrap": {
        "deps": ["jquery"],
        "exports": "jQuery"
      },
      "ember": {
        "deps": ["jquery", "handlebars"],
        "exports": "Ember"
      }
    }
  });
});
