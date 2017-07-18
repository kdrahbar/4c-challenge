define(function(require) {
  var breeze = require('breeze');
  var Q = require('Q');
  var URI = require('URI');
  var LIMIT = 10;
  var MAX_RESULTS = 20;
  var RETRIES = 1;

  var ctor = function() {
    this.name='facebook';
  };
  ctor.prototype.initialize = function() {};
  ctor.prototype.ajax = function(config, method) {
    if (!window.FB) {
      return Q.reject('FB Connect not initialized.');
    } else if (!FB.getAccessToken()) {
      return Q.reject('FB User not logged in.');
    }

    var p;
    switch(method) {
      case undefined:
      case 'FETCH':
        p = fetchObject(config.path, config.params);
        break;
      case 'EDGE':
        p = fetchEdge(config.path, $.extend(config.params, {limit: LIMIT}));
        break;
      case 'DELETE':
        p = deleteObject(config.path, config.params);
        break;
      default:
        p = Q.reject('Unsupported method');
    };
    return p;
  };

  breeze.config.registerAdapter('ajax', ctor);

  function isError(response) {
    return !response || !!response.error || !!response.error_msg;
  }

  function errorMessage(response) {
    if (!response) {
      return {
        msg: 'An unknown error occurred.',
        code: 0
      };
    } else {
      return {
        msg: response.error_msg || (response.error && response.error.message) || 'An unknown error occurred',
        code: response.error_code || (response.error && response.error.type) || 0
      };
    }
  }

  function fetch(path, params) {
    return dispatch(path, 'GET', params, RETRIES);
  }

  function fetchObject(path, params) {
    return fetch(path, params).then(function(r) {
      return Q.resolve(r.data);
    });
  }

  function fetchEdge(path, params) {
    var d = Q.defer();
    var results = [];
    var curr = 0;
    var count = undefined;

    function run() {
      fetch(path, params).then(
        function(r) {
          results = results.concat($.makeArray(r.data));
          if (!r.paging || !r.paging.next || results.length >= MAX_RESULTS) {
            d.resolve(results.slice(0, MAX_RESULTS));
          } else {
            var uri = URI(r.paging.next);
            $.extend(true, params, uri.search(true));
            setTimeout(run, 0);
          }
        }, function(r) {
          d.reject(r);
        }, function(r) {
          curr += r && r.value && r.value.current || 0;
          d.notify({current: curr, total: count});
        }
      );
    }
    run();
    return d.promise;
  }

  function deleteObject(path, params) {
    return dispatch(path, 'DELETE', params, RETRIES);
  }

  function dispatch(path, method, params, retries) {
    var d = Q.defer();
    function run() {
      FB.api(path, method, $.extend(true, {}, params), function(response) {
        if (!isError(response)) {
          var n = (data = $.makeArray(response.data || response)).length;
          d.notify({current: n, total: response.count || n});
          d.resolve({code: response.code || 200, data: data, paging: response.paging, count: response.count});
        } else if (retries-- > 0) {
          setTimeout(run, 0);
        } else {
          d.reject(new Error(JSON.stringify(errorMessage(response))));
        }
      });
    }
    run();
    return d.promise;  
  }
});
