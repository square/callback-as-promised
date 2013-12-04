var slice = Array.prototype.slice;

/**
 * Returns a function capable of returning a Promise or calling a passed
 * callback determinate of the last attribute being a function which implements
 * the "Node callback API"; `function(error, result)`.
 * @function callbackAsPromised
 * @param {function} fn
 *   function with an implemented promise to wrap for callback compliance
 * @return {function(...?)}
 *   function capable of promise or callback control flow
 * @example
 *   var CourteousClient = function() {};
 *
 *   CourteousClient.prototype.doSomethingAsync = callbackAsPromised(function(successful) {
 *     var deferred = new Deferred();
 *     setTimeout(function() {
 *       if (successful) {
 *         deferred.resolve('very successful');
 *       } else {
 *         deferred.reject(new Error("wasn't successful"));
 *       }
 *     }, 500);
 *     return deferred.promise;
 *   });
 *
 *   var courteousClient = new CourteousClient();
 *
 *   courteousClient.doSomethingAsync(true, function(err, result) {
 *     if (err) {
 *       // handle error
 *     }
 *     // handle success
 *   });
 *
 *   courteousClient.doSomethingAsync(true).then(function(result) {
 *     // handle success
 *   }, function(error) {
 *     // handle error
 *   });
 */
function callbackAsPromised(fn) {
  /**
   * @function polymorphicPromise
   * @param {...?}
   * @param {function(?Error, ?)=} callback optional callback
   * @return {?Promise=}
   *   returns fn's return value (promise) when callback is not passed through
   */
  return function polymorphicPromise() {
    var callback = arguments[arguments.length-1];
    if (typeof callback === 'function' && callback.length === 2) {
      var promise = fn.apply(this, slice.call(arguments, 0, arguments.length-1));
      promise.then(
        function(result){ callback(null, result); },
        function(err){ callback(err, null); }
      );
    } else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = callbackAsPromised;
