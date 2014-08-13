# callback as promised

Don't make promises you can't keep.

Develop with promises and expose, **both**, a callback and a promise interface.

```javascript
var callbackAsPromised = require('callback-as-promised');

var CourteousClient = function() {};

CourteousClient.prototype.doSomethingAsync = callbackAsPromised(function(successful) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (successful) {
        resolve('very successful');
      } else {
        reject(new Error("wasn't successful"));
      }
    }, 500);
  }
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

## Contributing

Any contributors to the callback-as-promised repository must sign the [Individual Contributor License Agreement (CLA)][cla]. It's a short form that covers our bases and makes sure you're eligible to contribute.

When you have a change you'd like to see in the master repository, send a pull request. Before we merge your request, we'll make sure you're in the list of people who have signed a CLA.

[cla]: https://spreadsheets.google.com/spreadsheet/viewform?formkey=dDViT2xzUHAwRkI3X3k5Z0lQM091OGc6MQ&ndplr=1
