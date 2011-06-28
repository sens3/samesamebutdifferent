var Image = require('mongoose').model('Images');

Cache = {
	
	
	getImageUrl: function(city, source, onEnd){
		console.log('Cache.getImageUrl from ' + source.name + ' for ' + city.name);
		Image.find({cityname: city.name, source: source.name}, function(err, docs){
			if (docs.length != 0)
				onEnd(Array.random(docs).url);
			else{
				source.getImages(Array.random(city.latLngs), city.name, function(images){
					images.forEach(function(image){
						Image.find({source_id: image.source_id}, function(err, docs){
							if(err)
								console.log(err);
							if(docs.length == 0){
								image.save(function(err){
									if(err)
										console.log(err);
								});
							}else
								console.log('Image ' + image.source_id + ' already exists, NOT SAVED!');
						});
					});	
					onEnd(images[0].url);
				});	
			}
		});
	}
}

exports.getImageUrl = Cache.getImageUrl;