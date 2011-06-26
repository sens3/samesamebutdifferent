SameSameButDifferent = {
	
	counter: 0,
	
	fetch: function(){
		$('.spinner').toggle();
		var that = this;
		$.get('/image', function(data){
			$('#images').html("<img class='instagram-image' src='" + data.url + "' />");
			that.location = data.location;
			$('.note').html('');
			$('.location-picker').removeClass('red');
			$('.location-picker').removeClass('green');
			$('.spinner').toggle();
		});
	},
	
	check: function(elem){
		if (elem.attr	('city') == this.location){
			elem.addClass('green');
			this.counter++;
		} else {
			elem.addClass('red');
			if (this.counter > 0)	
				this.counter--;
		}
		$('.counter').html(this.counter);
		this.fetch();
	}
};

$(function(){
	SameSameButDifferent.fetch();
	$('.location-picker').click(function(){
		SameSameButDifferent.check($(this));
	});
});