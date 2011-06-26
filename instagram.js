var https = require('https');
var http = require('http');
var cities = require('./cities')

ImageFetcher = {
	
	flickrKey: "08d798376d4fdc40a73ebf15fb13d0a5",
	
	flickrSecret: "e39123411fd0a474",
	
	instagramToken: "729309.f59def8.79fe456531e047ee97d6724e8fdfd62a",
	
	timeStamp: function(){
		var now = Math.round((new Date()).getTime() / 1000);
		var past = 1262304000;
		return past + Math.floor(Math.random()*(past-now));
	},
	
	distance: function(){
		return Math.floor(Math.random()*5000);
	},
		
	randomImageUrl: function(render){
		var city = Array.random(cities.data);
		var latLng = Array.random(city.latLngs);
		var geoSearchMethod = Array.random([ImageFetcher.flickrGeoSearch, ImageFetcher.instagramGeoSearch]);
		try{
			geoSearchMethod(latLng, function(url){
				console.log('city: ' + city.name + ', latlng: '+ latLng);
				if (url)	
					render(url, city.name);
				else
					ImageFetcher.randomImageUrl(render);
			});
		}catch(e){
			console.log("EXCEPTION during ImageFetcher.randomImageUrl:" + e.message);
			ImageFetcher.randomImageUrl(render);
		}
	},
	
	flickrGeoSearch: function(latLng, onEnd){
		console.log('running FLICKR geo search');
		var response = '';
		var path = "/services/rest?method=flickr.photos.search&format=json&api_key="+ImageFetcher.flickrKey+"&lat="+latLng[0]+"&lon="+latLng[1]+"&min_upload_date="+ImageFetcher.timeStamp();
		http.get({ host: "api.flickr.com", path: path}, function(res){
			res.on('data', function (chunk) {
			    response += chunk;
			});
			
			res.on('end', function(){
				data = response.replace(/jsonFlickrApi\((.+)\)/, '$1');
				var photos = JSON.parse(data).photos.photo;
				var item = Array.random(photos);
				if (item){
					var url = "http://farm"+item.farm+".static.flickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_z.jpg";
					onEnd(url);
				}else{
					onEnd();
				}
			});
		});
	},
	
	instagramGeoSearch: function(latLng, onEnd){
		console.log('running INSTAGRAM geo search');
		var response = '';
		
		var path = "/v1/media/search?distance="+ImageFetcher.distance()+"&lat="+latLng[0]+"&lng="+latLng[1]+"&access_token="+ImageFetcher.instagramToken+"&min_timestamp="+ImageFetcher.timeStamp();
		
		https.get({ host: 'api.instagram.com', path: path }, function(res){
			res.on('data', function (chunk) {
			    response += chunk;
			});
			
			res.on('end', function(){
				var data = JSON.parse(response).data;
				var item = Array.random(data);
				if (item)
					onEnd(item.images.standard_resolution.url);
				else
					onEnd();
			});
		});
	}
	
};

Array.random = function(array){
	return array[Math.floor(Math.random() * array.length)];
};

exports.randomImageUrl = ImageFetcher.randomImageUrl;

