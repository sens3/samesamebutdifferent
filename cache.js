var instagram = require('./instagram');
var flickr = require('./flickr');

var Image = require('mongoose').model('Images');

Cache = {
	
	getImage: function(city, sourceName, skipCache, onEnd){
		console.log('Cache.getImageUrl from ' + sourceName + ' for ' + city.name + ' (skipping cache: ' + skipCache + ')');
		source = require('./' + sourceName);
		Image.find({cityname: city.name, source: source.name}, function(err, docs){
			if (err) throw err;
			if ( !skipCache && docs.length != 0 ) {
				onEnd(Array.random(docs));
			} else {
				source.getImages(Array.random(city.latLngs), city.name, function(images){
					images.forEach(function(image){
						Image.find({source_id: image.source_id}, function(err, docs){
							if (err) throw err;
							if(docs.length == 0){
								console.log('Saving Image: ' + image.id)
								image.save(function(err){
									if (err) throw err;
								});
							}else
								console.log('Image ' + image.id + ' already exists, NOT SAVED!');
						});
					});	
					if (images.length != 0) {
					  onEnd(images[0]);
					} else {
					  throw "No images from " + sourceName + " for " + city.name;
					}
					  
				});	
			}
		});
	}
}

exports.getImage = Cache.getImage;