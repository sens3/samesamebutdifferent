Source = {
	timeStamp: function(){
		var now = Math.round((new Date()).getTime() / 1000);
		var past = 1262304000;
		return past + Math.floor(Math.random()*(past-now));
	},
	
	distance: function(){
		return Math.floor(Math.random()*5000);
	}
	
};

exports.timeStamp = Source.timeStamp;
exports.distance = Source.distance;