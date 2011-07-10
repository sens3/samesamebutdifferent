SameSameButDifferent = {
	
	counter: 0,
	
	fetch: function(){
		$('.loader').toggle();
		var that = this;
		$.get('/image', function(data){
			$('#images').html("<img class='instagram-image' src='" + data.url + "' />");
			that.location = data.location;
			that.imageId = data.image_id
			$('.location-picker').removeClass('red');
			$('.location-picker').removeClass('green');
			$('.loader').toggle();
			that.bind();
		});
	},
	
	check: function(elem){
		this.updateListOfViewedImages();
		this.unbind();
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
	},
	
	updateListOfViewedImages: function(){
		if (store.get(this.imageId)){
			$.get('/pull_images/' + this.imageId);
		}else{
			store.set(this.imageId, true);
		}
	},
	
	bind: function(){
		$('.location-picker').bind('click', function(){
			SameSameButDifferent.check($(this));
		});
	},
	
	unbind: function(){
		$('.location-picker').unbind('click');
	}
};

$(function(){
	
	SameSameButDifferent.fetch();
	
	$('.head').click(function(){
		$('.head .short').toggle();
		$('.head .full').toggle();
	});
	
});