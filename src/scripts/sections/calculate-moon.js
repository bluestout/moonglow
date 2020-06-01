$(document).ready(function () {
   $('.select-moon-product').click(function () {
    var date = $('.moon_date').val().split('/');
    find_moon_product(date[0],date[1],date[2]);
   })

   $('.moon-phase-block .content .block .img-block .img').click(function () {
      $('.moon-phase-block .content .block .img-block .img').removeClass('active')
      $(this).addClass('active');
      var moon = $(this).attr('data-moon');
      find_product(moon);
   })

   $("#moon-carousel").owlCarousel({
		loop:true,
		margin:10,
		nav:true,
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
  
  $('.moon-phase-block .owl-carousel .item').click(function () {
    $('.moon-phase-block .owl-carousel .item').removeClass('check')
    $(this).addClass('check');
    var moon = $(this).attr('data-moon');
    find_product(moon);
 })
});

function find_moon_product(moon_month,moon_date,moon_year){
    var current = moon_month+ "/" +moon_date+ "/" +moon_year;

    $.ajax({
      type: "GET",
      url: moonglow_path,
      datatype: "json",
      beforeSend: function() {
      // setting a timeout
      $(".loader-section").show();
    },
    success: function(data){
      $(".loader-section").hide();
      var moon = data[current];
      find_product(moon);
    }
  });

  };

function find_product(moon) {

  var img = 'https://cdn.shopify.com/s/files/1/2486/3224/t/228/assets/'+moon+'.png';
    $('.moon_phase').attr('src', img);

    var moon_text = {
      "NL": "New Moon",
      "CA": "Waxing Crescent",
      "1A": "Waxing Crescent",
      "2A": "Waxing Crescent", 
      "3A": "Waxing Crescent",
      "4A": "Waxing Gibbous",
      "5A": "Waxing Gibbous",
      "6A": "Waxing Gibbous",
      "7A": "Waxing Gibbous",
      "PL": "Full Moon",
      "7D": "Waning Gibbous",
      "6D": "Waning Gibbous",
      "5D": "Waning Gibbous",
      "4D": "Waning Gibbous",
      "3D": "Waning Crescent",
      "2D": "Waning Crescent",
      "1D": "Waning Crescent",
      "CD": "Waning Crescent",
      "LE": "Lunar Eclipse",
      "SE": "Solar Eclipse"
    };

    var moon_val = moon_text[moon];
    var cls = moon_val.split(" ");
    $(".moon-phase-block .block .img-block .img").each(function () {

      if ($(this).attr('data-moon') == moon) {
        $(this).addClass('active');
      }else{
        $(this).removeClass('active');
      }
    })
    if (moon_val != undefined) {
      var handle = '.collection_products_main .container .'+moon_val.replace(' ','-').toLowerCase();
      
      
      $('.collection_products_main').show();
      $('.collection_products_main .collection-template').hide();
      $(handle).show();
    }else{
        $('.form_alert').show();
        setTimeout(() => {
            $('.form_alert').hide();
        }, 5000);
    }
}
