var mongoose = require('mongoose');
var Image = new mongoose.Schema({
	url 			: String,
	source		: String,
	source_id : String,
	cityname	: String
});

mongoose.model('Images', Image);

var Image = require('mongoose').model('Images');

var cities = require('./cities');
var cache = require('./cache');

ImageFetcher = {
		
	randomImageUrl: function(whenDone){
		var city = Array.random(cities.data);
		var source = Array.random(['instagram', 'flickr']);
		cache.getImage(city, source, false, function(image){
			whenDone(image.url, city.name, image.id);
		});
	},
	
	pullImagesLike: function(image_id, whenDone){
		Image.find({_id:image_id}, function(err, docs){
			if (err) throw err;
			var image = docs[0];
			var sourceName = image.source;
			var city = cities.findByName(image.cityname, function(city){
				cache.getImage(city, sourceName, true, whenDone);
			});
		});
	}
	
};

Array.random = function(array){
	return array[Math.floor(Math.random() * array.length)];
};

exports.randomImageUrl = ImageFetcher.randomImageUrl;
exports.pullImagesLike = ImageFetcher.pullImagesLike;

