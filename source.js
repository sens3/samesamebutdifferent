Source = {
  // timestamp within the last 6 days
	timeStamp: function(){
		var now = Math.round((new Date()).getTime() / 1000);
		var sixDays = 600000;
		return now - Math.floor(Math.random() * sixDays);
	},
	
	distance: function(){
		return Math.floor(Math.random()*5000);
	}
	
};

exports.timeStamp = Source.timeStamp;
exports.distance = Source.distance;