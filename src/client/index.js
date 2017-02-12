//var gpio = require('rpi-gpio');
var gpio = require("pi-gpio");
gpio.setup(17, gpio.DIR_OUT, write_led);

window.addEventListener("DOMContentLoaded", () => {
    console.log("client started");
})

function openNav() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
function write_led() {
    if (document.getElementById('activation').checked) {
        gpio.open(11, "output", function(err) {     // Open pin 11 for output
            gpio.write(11, 1, function() {          // Set pin 11 high (1)
                gpio.close(11);                     // Close pin 11
            });
        });
    }
}

//API Jquery WU <!-- Weather UnderGround API key : 7a85bcde0c9ff4de *1* #new# @0@ ready for use -->
$(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/7a85bcde0c9ff4de/geolookup/conditions/q/IA/Cedar_Rapids.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['FR']['Viroflay'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
});

function show_hide_DIV_data()
{
var div=document.getElementById('DIV_data');
div.style.display = (div.style.display == "none") ? "block" : "none";
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 0;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}