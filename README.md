callback-as-promised
====================

Don't make promises you can't keep.

Develop with promises and expose, **both**, a callback and a promise interface.

```javascript
var callbackAsPromised = require('callback-as-promised');

var CourteousClient = function() {};

CourteousClient.prototype.doSomethingAsync = callbackAsPromised(function(successful) {
  var deferred = new Deferred();
  setTimeout(function() {
    if (successful) {
      deferred.resolve('very successful');
    } else {
      deferred.reject(new Error("wasn't successful"));
    }
  }, 500);
  return deferred.promise;
});

var courteousClient = new CourteousClient();

courteousClient.doSomethingAsync(true, function(err, result) {
  if (err) {
    // handle error
  }
  // handle success
});

courteousClient.doSomethingAsync(true).then(function(result) {
  // handle success
}, function(error) {
  // handle error
});
```
