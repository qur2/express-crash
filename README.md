express-crash
=============

Crash handling for express.


## Why?

Handling 404 & 500 errors in any web app is certainly a must-do. While this is an easy, but mandatory and not so fun task, this module comes in handy.


## I surely don't handle any error yet, how do I install it?

Easily:
```bash
npm install express-crash
```


## OK, quickly, how does it work?

It helps to setup standard express error handlers. There are 2 important things to understand:

* The module provides a `NotFoundError` enabling choosing between 404 and 500 errors. So whenever you want a 404, you can pass a `NotFoundError` to the next route handler.
* The module uses a catch 'em all route in order to emit a 404 if no route did match.


## How shall I set it up?

There are two ways of using it:

* Set things separately, one by one.
* Use the shortcut method `handle()` and give it your 404 and 500 handlers. It will do the rest.

In both case, make sure you carefully use `trapRoute()` after your actual routes as it will match anything in order to throw a not found error.


```js
// mandatory step: require the module
var crash = require('express-crash');

var handle404 = function(err, req, res, next) {
	// do something fancy to entertain the users
};
var handle500 = function(err, req, res, next) {
	// do something even more fancy to thrill the users
};

// manual handler setup
// trapRoute() sets the catch 'em all route, so be sure it comes after your actual handlers
app.use(crash.handle404(handle404));
app.use(crash.handle500(handle500));
crash.trapRoute(app);

// quick 'n easy way to set handlers
crash.handle(app, handle404, handle500);
```


## Dude, did you test anything?

Sure! Just install with dev deps:

```bash
npm install -d
```

Then run the tests:

```bash
make test
```


## License

(The MIT License)

Copyright (c) 2013 Aurélien Scoubeau

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
