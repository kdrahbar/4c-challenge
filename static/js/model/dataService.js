define(function(require) {
  var breeze = require('breeze');
  var Q = require('Q');
  var URI = require('URI');

  var ajaxImpl;

  var ctor = function() {
    this.name = 'facebook'
  };

  ctor.prototype = new breeze.AbstractDataServiceAdapter();

  ctor.prototype.initialize = function() {
    ajaxImpl = breeze.config.getAdapterInstance('ajax', 'facebook');
  };

  ctor.prototype.executeQuery = function(mappingContext) {
    var uri = URI(mappingContext.url);
    var path = uri.path();
    var params = $.extend(true, {}, mappingContext.query.parameters || {}, uri.search(true));
    delete params.$filter;
    var op = mappingContext.query.voxsup && mappingContext.query.voxsup.op || 'FETCH';
    return ajaxImpl.ajax({
      path: mappingContext.url,
      params: params
    }, op);
  };

  ctor.prototype.saveChanges = function(saveContext, saveBundle) {
    if (saveBundle.entities.length > 1) {
      throw new Error("Multi-entity save is not supported in this app.")
    }
    var entity = saveBundle.entities[0];
    var state = entity.entityAspect.entityState;
    if (state.isAdded()) {
      throw new Error('Entity creation is not supported in this app.');
    } else if (state.isModified()) {
      throw new Error('Entity modification is not supported in this app.');
    } else if (state.isDeleted()) {
      return ajaxImpl.ajax({path: entity.id}, 'DELETE').then(function(resp) {
        return Q.resolve({entities: [entity], keyMappings: []});
      });
    } else {
      throw new Error('Invalid entity state');
    }
  };

  ctor.prototype.jsonResultsAdapter = new breeze.JsonResultsAdapter({
    name: 'facebook',
    extractResults: function(results) {
      if (!results) throw new Error('Unable to extract results.');
      return results;
    },
    visitNode: function(node, parseContext, nodeContext) {
    }
  });

  breeze.config.registerAdapter('dataService', ctor);
});
