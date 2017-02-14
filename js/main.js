$(function() {
	// hide form steps on load
	$('.step').hide();

	// function to handle slow scroll
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top-70
        }, 1000);
				$('#step1').slideDown();
        return false;
      }
    }

  });

	// handle the generation of the javascript the user will need
	$('.getCode').click(function(e) {
		e.preventDefault();

		// validate all of the fields
		
		// add thinking indicator

		// post email to mailchimp

		// generate their share code
			// facebook = http://facebook.com/sharer.php?u={{url}}
			// twitter = http://twitter.com/intent/tweet?url={{url}}
			// TODO: how do we handle facebook/twitter?
		output = "<script>function handleClick() { var wndw=window.open('" + $('#shareUrl').val() + "');var timer = setInterval(function(){if(wndw.closed){ clearInterval(timer);document.location='" + $('#resourceUrl').val() + "'; }}, 200); }</script>";
		output += "<a href='#' onclick='handleClick()'>" + $('#linkText').val() + "</a>";

		// display share code	
		$('#copyMe').val(output);
		$('.step').hide();
		$('#step2').slideDown();
	});
});
