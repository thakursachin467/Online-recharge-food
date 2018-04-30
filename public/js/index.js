




$(document).ready(function(){

	$('.image-2').mouseover(function(){

		$(this).css("border", "2px solid red");
		$(this).css("box-shadow", "6px 9px #808080");


	});

	$('.image-2').mouseout(function(){

		$(this).css("border", "2px solid black");
		$(this).css("box-shadow", "2px 3px #808080");
	});



});
