$(document).ready(function() {
	const API_KEY = 'xnTIYzZLYXmshjuCxRwPNlTTCvsgp1f2MJzjsnCqAgKufLTtpW';
	const TWT_URL = 'https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&text=';
	const ERR_MSG = { msg:"Sorry quote not found!", by:"Please try again." };
	let tweetData;

	function Tweet(quote, authr) {
		this.quote = quote;
		this.authr = authr;
		this.data = `${TWT_URL}"${quote}" by:${authr}`
	}

	function getQuote() {
		$.ajax({
			url:'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
			type:'GET',
			dataType:'json',

			success:function(data) {
				const QUOTE = data[0].quote;
				const AUTHR = data[0].author;

				$("#quote").fadeOut(function() {
					$("#quote").html(`&ldquo;${QUOTE}&rdquo;`).fadeIn(1000);
				});

				$("#author").fadeOut(function() {
					$("#author").html(AUTHR).fadeIn(1000);
				});

				tweetData = new Tweet(QUOTE, AUTHR);
			},

			error: function(error) {
				$("#quote").html(ERR_MSG.msg);
				$("#author").html(ERR_MSG.by);
			},

			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Key", API_KEY);
			}

		});
	};

	$("#newQuote").click(function() {
		getQuote();
	});

	$('#tweet').click(function() {
		window.open(tweetData.data);
	});

	getQuote();

});
