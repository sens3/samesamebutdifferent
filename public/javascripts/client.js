SameSameButDifferent = {
	
	counter: 0,
	viewedImageIds: [],
	
	fetch: function(){
		$('.loader').toggle();
		var that = this;
		$.get('/image', function(data){
			$('#images').html("<img class='instagram-image' src='" + data.url + "' />");
			that.location = data.location;
			that.imageId = data.image_id
			$('.note').html('');
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
		if (this.viewedImageIds.indexOf(this.imageId) != -1){
			$.get('/pull_images/' + this.imageId);
			this.viewedImageIds = [];
		}else{
			this.viewedImageIds.push(this.imageId);
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
});