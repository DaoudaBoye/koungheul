$(document).ready(function() {
	var current_fs, next_fs, previous_fs; // fieldsets
	var animating = false; // flag to prevent quick multi-click glitches
  
	$(".next").click(function() {
	  if (animating) return false;
	  animating = true;
  
	  current_fs = $(this).parent();
	  next_fs = $(this).parent().next();
  
	  // activate next step on progressbar using the index of next_fs
	  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
  
	  // hide the current fieldset
	  current_fs.animate({ opacity: 0 }, {
		step: function(now, mx) {
		  scale = 1 - (1 - now) * 0.2;
		  left = (now * 50) + "%";
		  opacity = 1 - now;
		  current_fs.css({ 'transform': 'scale(' + scale + ')', 'position': 'absolute' });
		  next_fs.css({ 'left': left, 'opacity': opacity });
		},
		duration: 10,
		complete: function() {
		  current_fs.hide();
		  next_fs.show(); // show the next fieldset
		  animating = false;
		},
		easing: 'easeInOutBack'
	  });
	});
  
	$(".previous").click(function() {
	  if (animating) return false;
	  animating = true;
  
	  current_fs = $(this).parent();
	  previous_fs = $(this).parent().prev();
  
	  // de-activate current step on progressbar
	  $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  
	  // show the previous fieldset
	  previous_fs.show();
	  // hide the current fieldset
	  current_fs.animate({ opacity: 0 }, {
		step: function(now, mx) {
		  scale = 0.8 + (1 - now) * 0.2;
		  left = ((1 - now) * 50) + "%";
		  opacity = 1 - now;
		  current_fs.css({ 'left': left });
		  previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 800,
		complete: function() {
		  current_fs.hide();
		  previous_fs.show(); // show the previous fieldset
		  animating = false;
		},
		easing: 'easeInOutBack'
	  });
	});
  });
  