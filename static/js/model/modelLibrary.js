define(function(require) {
  var Ember = require('ember');
  var breeze = require('breeze');

  var backingStore = breeze.config.getAdapter('modelLibrary', 'backingStore');

  var ajaxImpl = undefined;

  var ctor = function() {
    this.name = 'emberBackingStore';
  }

  ctor.prototype = new backingStore();
  ctor.prototype.initializeEntityPrototype = function(proto) {
    backingStore.prototype.initializeEntityPrototype(proto);

    proto.getProperty = function(propertyName) {
      return Ember.get(this, propertyName);
    };

    proto.setProperty = function(propertyName, value) {
      if (!this._backingStore.hasOwnProperty(propertyName)) throw new Error('Unknown property name: ' + propertyName);
      Ember.set(this, propertyName, value);
      return this;
    };
  };

  breeze.config.registerAdapter('modelLibrary', ctor);
});