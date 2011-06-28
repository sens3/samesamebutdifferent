var mongoose = require('mongoose');
mongoose.model('Images', Image);

var Image = new mongoose.Schema({
	url 			: String,
	source		: String,
	source_id : String,
	cityname	: String
});

var cities = require('./cities');
var instagram = require('./instagram');
var flickr = require('./flickr');
var cache = require('./cache');

ImageFetcher = {
		
	randomImageUrl: function(render){
		var city = Array.random(cities.data);
		var source = Array.random([instagram, flickr]);
		cache.getImageUrl(city, source, function(url){
			render(url, city.name);
		});
	},
	
};

Array.random = function(array){
	return array[Math.floor(Math.random() * array.length)];
};

exports.randomImageUrl = ImageFetcher.randomImageUrl;

