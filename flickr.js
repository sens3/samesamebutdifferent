var source = require('./source');
var http = require('http');
var Image = require('mongoose').model('Images');

Flickr = {
	key: "08d798376d4fdc40a73ebf15fb13d0a5",
	secret: "e39123411fd0a474",
	name: 'flickr',
	
	getImages: function(latLng, cityname, save){
		console.log
		var response = '';
		var images = [];
		var path = "/services/rest?method=flickr.photos.search&format=json&api_key="+Flickr.key+"&lat="+latLng[0]+"&lon="+latLng[1]+"&min_upload_date="+source.timeStamp();
		http.get({ host: "api.flickr.com", path: path}, function(res){
			
			res.on('data', function (chunk) { response += chunk; });
			
			res.on('end', function(){
				data = response.replace(/jsonFlickrApi\((.+)\)/, '$1');
				var photos = JSON.parse(data).photos.photo;
				photos.forEach(function(item){
					var image = new Image();
					image.source_id = item.id;
					image.source = Flickr.name;
					image.cityname = cityname
					image.url = "http://farm"+item.farm+".static.flickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_z.jpg";
					images.push(image);
				});
				
				save(images);
				
			});
			
		});
	}
};

exports.getImages = Flickr.getImages;
exports.name = Flickr.name;