
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
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	mongoose.connect('mongodb://localhost/samesamebutdifferent');
});

app.configure('production', function(){
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
	imageFetcher.randomImageUrl(function(url, location){
		res.send({url: url, location: location});
	});
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Express server listening on port %d", app.address().port);
