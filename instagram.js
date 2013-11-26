var source = require('./source');
var https = require('https');
var Image = require('mongoose').model('Images');

Instagram = {
	clientId: "81ff343601134cbf8e90d5e1847693bb",
	name: 'instagram',
	
	getImages: function(latLng, cityName, save){
		var images = [];
		var response = '';
		var path = "/v1/media/search?distance="+source.distance()+"&lat="+latLng[0]+"&lng="+latLng[1]+"&client_id="+Instagram.clientId+"&min_timestamp="+source.timeStamp();

		https.get({ host: 'api.instagram.com', path: path }, function(res){
			
			res.on('data', function(chunk){ response += chunk; });

			res.on('end', function(){

				JSON.parse(response).data.forEach(function(item){
					var image = new Image();
					image.url = item.images.standard_resolution.url;
					image.cityname = cityName;
					image.source = Instagram.name;
					image.source_id = item.id;
					images.push(image);
				});
				
				save(images);
				
			});
			
		});
	}
};

exports.getImages = Instagram.getImages;
exports.name = Instagram.name;
