var https = require('https');
var cities = require('./cities')
Instagram = {
	
	token: "729309.f59def8.79fe456531e047ee97d6724e8fdfd62a",
	
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
		Instagram.geoSearch(latLng, function(url){
			if (url)	
				render(url, city.name);
			else
				Instagram.randomImageUrl(render);
		});
	},
	
	geoSearch: function(latLng, onEnd){
		var searchResults = '';
		
		var path = "/v1/media/search?distance="+this.distance()+"&lat="+latLng[0]+"&lng="+latLng[1]+"&access_token="+this.token+"&min_timestamp="+this.timeStamp();
		https.get({ host: 'api.instagram.com', path: path }, function(res){
			res.on('data', function (chunk) {
			    searchResults += chunk;
			});
			
			res.on('end', function(){
				var data = JSON.parse(searchResults).data;
				var item = Array.random(data);
				if (item)
					onEnd(item.images.standard_resolution.url);
				else
					onEnd();
			});
			
		});
	},
	
};

Array.random = function(array){
	return array[Math.floor(Math.random() * array.length)];
};

exports.randomImageUrl = Instagram.randomImageUrl;

