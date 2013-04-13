var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var crash = require(__dirname + '/../');

describe('crash', function () {
	var app,
		handle404 = crash.handle404(function (err, req, res, next) {
			res.send('404 not found!');
		}),
		handle500 = crash.handle500(function (err, req, res, next) {
			res.send('500 broken!');
		});

	describe('handles errors', function () {
		beforeEach(function () {
			app = express();
			app.get('/', function (req, res) {
				res.send(200);
			});
			app.get('/broken', function (req, res, next) {
				next(new Error());
			});
			crash.trapRoute(app);
		});

		it('only if necessary', function (done) {
			request(app)
				.get('/')
				.expect(200, done);
		});

		it('404', function(done) {
			app.use(handle404);

			request(app)
				.get('/blackhole')
				.expect(404, '404 not found!', done);
		});

		it('500', function(done) {
			app.use(handle500);

			request(app)
				.get('/broken')
				.expect(500, '500 broken!', done());
		});

		it('only if necessary (global)', function(done) {
			crash.handle(app, handle404, handle500);

			request(app)
				.get('/')
				.expect(200, done);
		});

		it('404 (global)', function(done) {
			crash.handle(app, handle404, handle500);

			request(app)
				.get('/blackhole')
				.expect(404, '404 not found!', done);
		});

		it('500 (global)', function(done) {
			crash.handle(app, handle404, handle500);

			request(app)
				.get('/broken')
				.expect(500, '500 broken!', done());
		});
	});
});
