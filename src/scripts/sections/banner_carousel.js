$(document).ready(function () {

	var dragging = true;
	var owlElementID = "#owl-banner";

	function fadeInReset() {
		if (!dragging) {
			$(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").stop().delay(800).animate({ opacity: 0 }, { duration: 400, easing: "easeInCubic" });
		}
		else {
			$(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").css({ opacity: 0 });
		}
	}

	function fadeInDownReset() {
		if (!dragging) {
			$(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").stop().delay(800).animate({ opacity: 0, top: "-15px" }, { duration: 400, easing: "easeInCubic" });
		}
		else {
			$(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").css({ opacity: 0, top: "-15px" });
		}
	}

	function fadeInUpReset() {
		if (!dragging) {
			$(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").stop().delay(800).animate({ opacity: 0, top: "15px" }, { duration: 400, easing: "easeInCubic" });
		}
		else {
			$(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").css({ opacity: 0, top: "15px" });
		}
	}

	function fadeInLeftReset() {
		if (!dragging) {
			$(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").stop().delay(800).animate({ opacity: 0, left: "15px" }, { duration: 400, easing: "easeInCubic" });
		}
		else {
			$(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").css({ opacity: 0, left: "15px" });
		}
	}

	function fadeInRightReset() {
		if (!dragging) {
			$(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").stop().delay(800).animate({ opacity: 0, left: "-15px" }, { duration: 400, easing: "easeInCubic" });
		}
		else {
			$(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").css({ opacity: 0, left: "-15px" });
		}
	}

	function fadeIn() {
		$(owlElementID + " .active .caption .fadeIn-1").stop().delay(500).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeIn-2").stop().delay(700).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeIn-3").stop().delay(1000).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
	}

	function fadeInDown() {
		$(owlElementID + " .active .caption .fadeInDown-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInDown-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInDown-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
	}

	function fadeInUp() {
		$(owlElementID + " .active .caption .fadeInUp-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInUp-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInUp-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
	}

	function fadeInLeft() {
		$(owlElementID + " .active .caption .fadeInLeft-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInLeft-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInLeft-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
	}

	function fadeInRight() {
		$(owlElementID + " .active .caption .fadeInRight-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInRight-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
		$(owlElementID + " .active .caption .fadeInRight-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
	}

	$(owlElementID).owlSlideshow({

		autoPlay: 5000,
		stopOnHover: true,
        navigation: true,
		pagination: true,
		singleItem: true,
		addClassActive: true,
		transitionStyle : "fade",
		navigationText: [
			'<svg width="19px" height="11px" viewBox="0 0 19 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="icons" transform="translate(-793.000000, -118.000000)" fill="#CEC1B5" fill-rule="nonzero"><g id="long_arrow_right_ico" transform="translate(803.000000, 123.500000) scale(-1, 1) translate(-803.000000, -123.500000) translate(795.000000, 119.000000)"><g id="ui/elements/arrow_2"><polygon id="Line" points="-0.757575758 5.60606061 -0.757575758 3.60606061 14.8181818 3.60606061 14.8181818 5.60606061"></polygon><polygon id="Path-2" points="10.4826307 0.743366351 11.8203996 -0.743366351 17.4948471 4.36252785 11.8205601 9.47049467 10.4824702 7.98405078 14.5051529 4.36285053"></polygon></g></g></g></g></svg>',
			'<svg width="19px" height="11px" viewBox="0 0 19 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="icons" transform="translate(-750.000000, -118.000000)" fill="#CEC1B5" fill-rule="nonzero"><g id="long_arrow_left_ico" transform="translate(751.000000, 119.000000)"><polygon id="Line" points="-0.757575758 5.60606061 -0.757575758 3.60606061 14.8181818 3.60606061 14.8181818 5.60606061"></polygon><polygon id="Path-2" points="10.4826307 0.743366351 11.8203996 -0.743366351 17.4948471 4.36252785 11.8205601 9.47049467 10.4824702 7.98405078 14.5051529 4.36285053"></polygon></g></g></g></svg>'
		],

    	afterInit: function() {
        	fadeIn();
        	fadeInDown();
        	fadeInUp();
        	fadeInLeft();
        	fadeInRight();
    	},

    	afterMove: function() {
        	fadeIn();
			fadeInDown();
        	fadeInUp();
        	fadeInLeft();
        	fadeInRight();
    	},

    	afterUpdate: function() {
        	fadeIn();
			fadeInDown();
        	fadeInUp();
        	fadeInLeft();
        	fadeInRight();
    	},

    	startDragging: function() {
			dragging = true;
    	},

    	afterAction: function() {
        	fadeInReset();
			fadeInDownReset();
			fadeInUpReset();
        	fadeInLeftReset();
        	fadeInRightReset();
			dragging = false;
    	}

    });

	if ($(owlElementID).hasClass("owl-one-item")) {
		$(owlElementID + ".owl-one-item").data('owlCarousel').destroy();
	}

	$(owlElementID + ".owl-one-item").owlCarousel({
		singleItem: true,
		navigation: false,
		pagination: false
	});
	$(document).ready(function () {
		$("#owl-banner .owl-wrapper-outer .owl-item .desc").each(function () {
			if($("#owl-banner").height() < ($(this).height()+300)){
				$("#owl-banner").height($(this).height()+300);
				if($('body').innerWidth() < 769){
					$("#owl-banner").height($(this).height()+425);
				}
			}
		 });
	})


	$('#transitionType li a').click(function () {

		$('#transitionType li a').removeClass('active');
		$(this).addClass('active');

		var newValue = $(this).attr('data-transition-type');

		$(owlElementID).data("owlCarousel").transitionTypes(newValue);
		$(owlElementID).trigger("owl.next");

		return false;

	});



	$(".slider-next").click(function () {
		owl.trigger('owl.next');
	})

	$(".slider-prev").click(function () {
		owl.trigger('owl.prev');
	})


	$("#owl-new-arrival").owlCarousel({

		loop:true,
		margin:10,
		merge:true,
		dotsEach: true,
		responsive:{
			0:{
				items:3,
				mergeFit:true
			},
			678:{
				items:5,
				mergeFit:true
			},
			1000:{
				mergeFit:false
			}
		}
	});
	$("#owl-collection").owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		dotsEach: true,
		responsive:{
			0:{
				items:3,
				mergeFit:true
			},
			678:{
				items:5,
				mergeFit:true
			},
			1000:{
				items:8,
				mergeFit:false
			}
		}
	});

	$("#feature-products").owlCarousel({
		loop:true,
		margin:10,
		responsiveClass:true,
		nav:true,
		dotsEach: true,
		responsive:{
			0:{
				items:2,
				nav:true
			},
			600:{
				items:3,
				nav:false
			},
			1000:{
				items:4,
				nav:true,
				loop:false
			}
		}
	});
});
