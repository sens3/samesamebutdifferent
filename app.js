
/**
 * Module dependencies.
 */

var express = require('express');

var instagram = require('./instagram');

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
});

app.configure('production', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'same same but different'
  });
});

app.get('/image', function(req, res){
	instagram.randomImageUrl(function(url, location){
		res.send({url: url, location: location});
	});
});


app.listen(5000);
console.log("Express server listening on port %d", app.address().port);
