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
        goToStep(1);
        return false;
      }
    }

  });

  // handle the generation of the javascript the user will need
  $('.getCode').click(function(e) {
    // validate all of the fields
    $("#inputForm").validate({
      rules: {
        shareUrl: {required: true, url: true},
        resourceUrl: {required: true, url: true},
        linkText: {required: true},
        email: {required: true, email: true}
      },
      messages: {
        shareUrl: "Please enter a valid URL",
        resourceUrl: "Please enter a valid URL",
        linkText: "Please enter link text",
        yourEmail: "Please enter a valid email",
      },
      submitHandler: function(form) {
        // add thinking indicator
        goToStep(2);

        // generate their share code
          // facebook = http://facebook.com/sharer.php?u={{url}}
        if ($('#socialMedia').val() == "Facebook") {
          var socialMediaUrl = "http://facebook.com/sharer.php?u=" + $('#shareUrl').val();
        } else {
          // twitter = http://twitter.com/intent/tweet?url={{url}}
          var socialMediaUrl = "http://twitter.com/intent/tweet?url=" + $('#shareUrl').val();
        }
        
        output = "<script>function handleClick" + $('#socialMedia').val() + "() { var wndw=window.open('" + socialMediaUrl+ "');var timer = setInterval(function(){if(wndw.closed){ clearInterval(timer);document.location='" + $('#resourceUrl').val() + "'; }}, 200); }</script>";
        output += "<a href='#' onclick='handleClick" + $('#socialMedia').val() + "()'>" + $('#linkText').val() + "</a>";

        setTimeout(function() {
          // display share code 
          $('#copyMe').val(output);
          goToStep(3);
        }, 2000);
      }
    });
  });

  $('.startOver').click(function(e) {
    e.preventDefault();
    
    // clear out previous entries
    $('#inputForm')[0].reset();

    // show the form again
    goToStep(1);
  });
});

function goToStep(number) {
  $('.step').hide();
  $('#step' + number).slideDown();
}
