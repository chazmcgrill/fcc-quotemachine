$(document).ready(function() {
	var tweetData = {message: "", by: ""};
	var errorMessage = {message:"Sorry quote not found!",by:"Please try again."};

	function getQuote() {
		$.ajax({
			url:'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
			type:'GET',
			dataType:'json',

			success:function(data) {
				$("#quote").fadeOut(function(){
					$("#quote").html('&ldquo;' + data[0].quote + '&rdquo;').fadeIn(1000);
				});
				$("#author").fadeOut(function(){
					$("#author").html(data[0].author).fadeIn(2000);
				});
				tweetData.message = data[0].quote;
				tweetData.by = data[0].author;
			},

			error:function(error){
				$("#quote").html(errorMessage.message);
				$("#author").html(errorMessage.by);
			},

			beforeSend:function(xhr){
				xhr.setRequestHeader("X-Mashape-Key", "xnTIYzZLYXmshjuCxRwPNlTTCvsgp1f2MJzjsnCqAgKufLTtpW");
			}

		});
	}

	getQuote();

	$("#newQuote").click(function() {
		getQuote();
	});

	$('#tweet').click(function() {
		window.open('https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&text=' + ' "' + tweetData.message + '" ' + tweetData.by);
	});

});
