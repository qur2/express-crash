var exports = module.exports = {};
var util = require('util');

// Error passed to identify 404 errors.
function NotFoundError(msg, constructor) {
	this.name = 'NotFoundError';
	this.message = msg || 'Not found error';
	Error.captureStackTrace(this, NotFoundError);
}
util.inherits(NotFoundError, Error);

// Wraps an error handler and calls it if the error is a `NotFoundError`.
// @see http://expressjs.com/guide.html#error-handling
function handle404(handler) {
	return function(err, req, res, next) {
		if (err instanceof NotFoundError) {
			res.status(404);
			handler.call(this, err, req, res, next);
		}
		else next(err, req, res, next);
	};
}

// Wraps an error handler and calls it if the error is not a `NotFoundError`.
// @see http://expressjs.com/guide.html#error-handling
function handle500(handler) {
	return function(err, req, res, next) {
		if (err instanceof NotFoundError) next(err, req, res, next);
		else {
			res.status(500);
			handler.call(this, err, req, res, next);
		}
	};
}

// Makes sure that any error has a chance to be catched by the handlers.
// Usually, you want this to be the last function in the middleware stack.
function trapRoute(app) {
	app.all('/*', function(req, res, next) {
		next(new NotFoundError());
	});
}

function handle(app, err404, err500) {
	if (err500) app.use(handle500(err500));
	if (err404) app.use(handle404(err404));
	trapRoute(app);
}

exports.NotFoundError = NotFoundError;
exports.handle404 = handle404;
exports.handle500 = handle500;
exports.trapRoute = trapRoute;
exports.handle = handle;
