
/**
 * Module dependencies.
 */

var express = require('express');
var https = require('https');
var http = require('http');
var imageFetcher = require('./image_fetcher');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	console.log('running development environment');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	mongoose.connect('mongodb://localhost/samesamebutdifferent');
});

app.configure('production', function(){
	console.log('running production environment');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	mongoose.connect('mongodb://heroku:7abz06mxte53yce3cyv08c@staff.mongohq.com:10098/app578531');
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'same same but different'
  });
});

app.get('/image', function(req, res){
	imageFetcher.randomImageUrl(function(url, location, image_id){
		res.send({url: url, location: location, image_id: image_id});
	});
});

app.get('/pull_images/:image_id', function(req, res){
	console.log(req.params);
	imageFetcher.pullImagesLike(req.params['image_id'], function(){
		res.send();
	})
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Express server listening on port %d", app.address().port);
