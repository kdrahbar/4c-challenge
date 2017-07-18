define(function(require) {
  var breeze = require('breeze');
  var Q = require('Q');
  var DT = breeze.DataType;

  var initialize = function(metadataStore) {
    metadataStore.addEntityType({
      shortName: 'User',
      dataProperties: {
        id: {
          dataType: DT.Int64,
          isPartOfKey: true
        },
        name: {
          dataType: DT.String
        },
        username: {
          dataType: DT.String
        }
      }
    });
  };

  var downloadUser = function(manager) {
    var p = {
      _VOXSUPMETHOD_: 'OBJ'
    };

    q = breeze.EntityQuery.from('me').withParameters(p).toType('User');
    return manager.executeQuery(q);
  };

  return {
    initialize: initialize,
    downloadUser: downloadUser
  };
});
