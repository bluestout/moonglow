
var year='', month='', date='', history = [];
$(document).ready(function () {
  if ($('body').innerWidth() < 769) {
    var height = $('#shopify-section-header').outerHeight();
    $('#MainContent').css('margin-top', height);
  }

});

$(".link-list .title").click(function(){
    $(this).parent().find("ul").slideToggle("fast");

    if($(this).find("i").hasClass("fa-plus")){
        $(this).find("i").addClass("fa-minus");
        $(this).find("i").removeClass("fa-plus");
    }else{
        $(this).find("i").removeClass("fa-minus");
        $(this).find("i").addClass("fa-plus");
    }
})

$( function() {
    $( ".datepicker" ).datepicker({
      startView: 2,
      defaultViewDate: {year: '2010'},
      startDate:'01/01/1919',
      endDate:'12/31/2030',
      maxViewMode: 2
    });
} );

$('.slide_btn').click(function () {

  if (!$(this).hasClass('active')) {
    $(this).addClass('active');
  }else{
    $(this).removeClass('active');
  }
  $(this).parent().find('.slide_content').slideToggle();
});

$("a.month").click(function () {
  $(".date-header a").removeClass('active');
  $(this).addClass('active');
  $('.content-field').hide();
  $('.month-field').fadeIn();
  $('.content-field').removeClass("opened");
  $(".month-field").addClass('opened');
})

$("a.date").click(function () {
  $(".date-header a").removeClass('active');
  $(this).addClass('active');
  $('.content-field').hide();
  $('.date-field').fadeIn();
  $('.content-field').removeClass("opened");
  $(".date-field").addClass('opened');
})

$("a.year").click(function () {
  $(".date-header a").removeClass('active');
  $(this).addClass('active');
  $('.content-field').hide();
  $('.year-field').fadeIn();
  $('.content-field').removeClass("opened");
  $(".year-field").addClass('opened');
})


$(".start-btn").click(function () {
  $(".field").hide();
  $(".calendars").fadeIn();
  $(".calendars .year-field").fadeIn();
  $('.content-field').removeClass("opened");
  $(".year-field").addClass('opened');
  month = '';
  date = '';
  year = '';
  $("span.back").addClass('active');
  history.push('start');
  $.cookie('page-history', JSON.stringify(history));
  $("span.back").attr('page-target', 'start');
})

$('span.back').click(function () {
  start_position: while (true) {
    var history_array = $.parseJSON($.cookie('page-history'));
    var target_page = history_array.pop();
    $.cookie('page-history',JSON.stringify(history_array));

    if (target_page == 'start' ) {
      var page = '.'+target_page;
      $(".field").hide();
      $(page).fadeIn();
      $('.content-field').removeClass("opened");
      $(page).addClass('opened');
      $(this).removeClass('active');
    }else{
      var page = '.'+target_page;
      if(!$(page).hasClass("opened")){
        $(".field .calendar .content .content-field").hide();
        $(page).fadeIn();
        $('.content-field').removeClass("opened");
        $(page).addClass('opened');
      }else{
        continue start_position;
      }
      break;
    }
  }
});

$(document).ready(function () {
  if ($.cookie("permissionAccess") === undefined) {
    $('.cookie_banner_popup').show();
  }
})

//
$('body').on('click', '.custom_button_cookie a.button-close', function () {
  $.cookie("permissionAccess","accepted", {path : '/'});
  $('.cookie_banner_popup').hide();
});

$(".custom_button_cookie a.button-not-allow").on('click', function () {
  $.cookie("permissionAccess","not_allow", {path : '/'});
  $('.cookie_banner_popup').hide();

});

$('.save-date').click(function () {
  if(!$('body').hasClass('stop-scroll')){
    $('body').addClass('stop-scroll');
  }
  // $('#moon-phase').hide();
  // $('#moon-phase').removeClass("active");
  $('#moon-phase').css('z-index', 1);
  $('#date-save-modal').show();

  $('#date-save-modal .moon-date').text(obj_moon_date.current_date);

})

$('.save_ocassion_btn').click(function () {
      var occasion = $('.occasion').val();
      if(occasion != ''){
        obj_moon_date.occasion = occasion;
        var result = add_moon_date(obj_moon_date);
        if(result){
          setTimeout(() => {
            $('#date-save-modal').hide();
            $('body').removeClass('stop-scroll');
            if (!$('#moon-phase').hasClass('active')) {
              $('.dark-bg').hide();
              
            }else{
              $('body').addClass('stop-scroll');
            }
            
            $('#moon-phase').css('z-index', 50);
            $('.js .save-date').hide();
          }, 1000);
        }  
      }else{
        $('.occasion').parent().addClass('danger');
      }

})

$('.occasion').change(function () {
  $('.occasion_field').removeClass('danger');
})

$(".year-field li").click(function () {
  $(".year-field li").removeClass('active');
   $(this).addClass('active');
   year = parseInt($(this).text())

   history.push('year-field');
   $.cookie('page-history', JSON.stringify(history));
   $('span.back').attr('page-target', 'year-field');
   if (month == '') {
    $('.content-field').hide();
    $('.month-field').fadeIn();
    $('.content-field').removeClass("opened");
    $('.month-field').addClass('opened');
   }else if(date == ''){
    $('.content-field').hide();
    $('.date-field').fadeIn();
    $('.content-field').removeClass("opened");
    $('.date-field').addClass('opened');
   }else{
    create_save_field(date, month, year, '.modal_alert');

   }
})
$(".month-field li").click(function () {
  $(".month-field li").removeClass('active')
  $(this).addClass('active');
  var month_name = {
    "January" : "01",
    "February" : "02",
    "March" : "03",
    "April" : "04",
    "May" : "05",
    "June" : "06",
    "July" : "07",
    "August" : "08",
    "September" : "09",
    "October" : "10",
    "November" : "11",
    "December" : "12"
  };
  month = parseInt(month_name[$(this).text()]);
  if (month < 10) {
    month = '0'+month;
  }
  history.push('month-field');
  $.cookie('page-history', JSON.stringify(history));
  $('span.back').attr('page-target', 'month-field');
  if (date == '') {
    $('.content-field').hide();
    $('.date-field').fadeIn();
    $('.content-field').removeClass("opened");
    $('.date-field').addClass('opened');
   }else if(year == ''){
    $('.content-field').hide();
    $('.year-field').fadeIn();
    $('.content-field').removeClass("opened");
    $('.year-field').addClass('opened');
   }else{
    create_save_field(date, month, year);
   }

});

$(".date-field li").click(function () {
  $(".date-field li").removeClass('active')
  $(this).addClass('active');
  date = parseInt($(this).text());
  if (date < 10) {
    date = '0'+date;
  }
  history.push('date-field');
   $.cookie('page-history', JSON.stringify(history));
  $('span.back').attr('page-target', 'date-field');
  if (month == '') {
    $('.content-field').hide();
    $('.month-field').fadeIn();
    $('.content-field').removeClass("opened");
    $('.month-field').addClass('opened');
   }else if(year == ''){
    $('.content-field').hide();
    $('.year-field').fadeIn();
    $('.content-field').removeClass("opened");
    $('.year-field').addClass('opened');
   }else{
      create_save_field(date, month, year);
  }

});

$('#videoTara').click(function () {
  $('#videoTara').play()
})

$('#video_modal span.close').click(function () {
  $(this).parent().find('#videoTara').get(0).pause();
  $(this).parent().hide();
  $(".dark-bg").hide();
  $(this).parent().removeClass('active');
  $('body').removeClass('stop-scroll');
})

$(".modal_btn").click(function(e){
  e.preventDefault();
  var target = "#"+$(this).attr("data-target");
  $(target).show();
  $(target).addClass("active");
  $(".dark-bg").show();
});
$('.select-moon').click(function () {
  if ($('body').innerWidth() > 768) {
    var date = [];
    if ($('.moon_date').val() == "") {
      $('.form_alert').removeClass('alert-success');
      $('.form_alert').addClass('alert-danger');
      $('.form_alert').text('Please select Correct date !');
      $('.form_alert').show();
    }else{
      date = $('.moon_date').val().split('/');
    }


    create_save_modal(date[1], date[0], date[2]);
  }else{
    $('body').addClass('stop-scroll');
    $('#moon-phase').show();
    $('#moon-phase').addClass("active");
    $(".dark-bg").show();
  }
})

$('body').on('click', "a.close", function(){
  $(".dark-bg").hide()
  $(this).parent().hide();
  $(this).parent().removeClass("active");
  $('body').removeClass('stop-scroll');
})


$("#list-carousel").owlCarousel({
    loop:true,
		margin:10,
		merge:true,
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

$( document ).ready(function () {

    var i = 0;
    var item = '.pagination .grid__item';
    var item_hidden = ".pagination .hide";
    var val = $(item).length - $(item_hidden).length;
    $(".load_more_btn").text("load more ( " + val + "/" + $(item).length + " )")

    $(item).slice(0, val-1).show();
    if ($(item_hidden).length != 0) {
      i = $(item_hidden).length;
      $(".load_more_btn").show();
    }else{
      $(".load_more_btn").hide();
    }

    var j = 1;
    $(".load_more_btn").on('click', function (e) {
      e.preventDefault();
      j ++ ;

      if($(item_hidden).length > val){
        var num = j * val;
      }else{
        var num = $(item).length;
      }
      $(item).slice(0, num).removeClass('hide');
      $(item).slice(0, num).slideDown();
      $(".load_more_btn").text("load more ( " + num + "/" + $(item).length + " )")
      if ($(item_hidden).length == 0) {
        $(".load_more_btn").fadeOut('slow');
      }
    });
    var num = 0;
    $(window).scroll(function() {
      $(".blogs-block .animated").each(function(){

        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            if (num < 3) {
              num += 1;
            }

            setTimeout(() => {

              $(this).addClass("fadeIn");
            }, 500*num);

          }
      });
    });

    $(".questions-ans h2").click(function () {
      if ($(this).hasClass('active')) {
        $(this).parent().find('.que-ans-wrap').slideDown();
        $(this).removeClass('active');
      }else{
        $(this).parent().find('.que-ans-wrap').slideUp();
        $(this).addClass('active');
      }
     });
     $('.question').click(function () {
        if ($(this).hasClass('active')) {
          $('.que-ans-wrap p:not(.question)').slideUp();
          $('.question').removeClass('active');
        }else{
          $(this).addClass('active');
          $(this).parent().find('p:not(.question)').slideDown();
        }
      })
      $(".menu .link-list .active").click(function (e) {
        e.preventDefault();
        $(".menu .link-list li:not(.active)").fadeToggle();
      })
      $(".menu .link-list li").click(function (e) {
        if (!$(this).hasClass('active')) {
          location = $(this).find('a').attr('href');
        }

      });

      $("#carousel-content").owlCarousel({

        loop:true,
        margin:10,
        merge:true,
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

});
$('.filter_btn').click(function () {

  $('.filter_form').slideToggle();
});

$(document).ready(function () {

  if ($('body').innerWidth() < 978) {
    $('#owl-main .item').each(function () {
      var mobile_img = $(this).attr('mobile_image');
      $(this).css('background-image', 'url('+mobile_img+')');
    })
  }

  $(".gf-sort-wrap .filter").click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('#gf-tree').fadeOut();
    }else{
      $(this).addClass('active');
      $('#gf-tree').fadeIn();
    }
  });
  $('.sort-by-toggle').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.select-box').fadeOut();
    }else{
      $(this).addClass('active');
      $('.select-box').fadeIn();
    }
  });

  $('.select-box li').click(function (e) {
    e.preventDefault();
    var val = $(this).attr('data-target');
    $('#changeSortBy').val(val).change();
    $('.select-box').hide();
  });
  $('#gf-tree .gf-filter-contents .gf-option-block h3 span').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).parent().parent().parent().find.slideUp();
    }else{
      $(this).addClass('active');
      $(this).parent().parent().parent().find('.gf-filter-content').slideDown();
    }
  });

  $('#shopify-section-register-template .register .grid .pannel .content form span').click(function () {
    $('.news-letter').trigger('click');
    if ($(this).hasClass('checked')) {

      $(this).removeClass('checked');
    }else{
      $(this).addClass('checked');
    }

  });

  $('.set-default label').click(function () {
    $('.set-default input').trigger('click');
    if ($(this).hasClass('checked')) {

      $(this).removeClass('checked');
    }else{
      $(this).addClass('checked');
    }

  });

});

$(document).ready(function () {
  $('#datepicker').change(function () {
    $('.datepicker-dropdown').hide();
  })
  $('.datepicker').change(function () {
    $('.datepicker-dropdown').hide();
  })
  if ($.cookie('moon_dates')) {
    var moon_dates = $.parseJSON($.cookie("moon_dates"));
    var html = "<option>Select from your saved dates</option>";
    for (let index = 0; index < moon_dates.length; index++) {
      const element = moon_dates[index];
      if (index == 0) {

        var moon_img = 'https://cdn.shopify.com/s/files/1/2486/3224/t/228/assets/'+ element.image_code +'.png';
        var icon = 'url("//cdn.shopify.com/s/files/1/2486/3224/t/224/assets/'+ element.image_code +'.svg?v=11652889623755090936") no-repeat center center';
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text_title .find_moon_pannel .date_picker h5').text(element.result_date);
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text__image img').attr('src', moon_img);
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text__image img').attr('srcset', moon_img);
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text_title .find_moon_pannel .moon-phase').css("background", icon);
      }

      html += "<option value="+ element.current_date +">"+element.current_date+"-"+element.occasion+"-"+element.moon_val+"</option>";
    }

    $(".saved-dates").html(html);
  }else{
    $(".moon_phase_cookie").hide();
  }

})

$(document).on("click", "#side_cart .main_gift_div .gift_checkbox .adding_gift ", (function(e) {
  e.preventDefault();
  var t = $(this),
      o = $(this).closest(".items"),
      i = (simply.cartJson.items, o.attr("data-item"));

  if (cn(i)) return console.error("Found error adding giftcard"), !1;
  i = parseInt(i);
  var s = parseInt($(".qty input", o).val()),
      a = simply.cartJson.items[i].properties,
      n = "yes";
  t.hasClass("gifted") && (n = "no"), a["gift-wrap"] = n;
  var data = {
    quantity: s,
    line: i + 1,
    properties: a
  };
  update_cart(data);
}))

$(document).on("click", '#side_cart .qty .spinner .min', (function (e) {
  e.preventDefault();
  var num = parseInt($(this).parent().find("input").val()) - 1;
  $(this).parent().find("input").val(num);
  var t = $(this),
    o = $(this).closest(".items"),
    i = (simply.cartJson.items, o.attr("data-item"));

  if (cn(i)) return console.error("Found error adding giftcard"), !1;
  i = parseInt(i);
  var s = parseInt($(".qty input", o).val()),
    a = simply.cartJson.items[i].properties,
    n = "yes";
  t.hasClass("gifted") && (n = "no"), a["gift-wrap"] = n;
  var data= {
  quantity: s,
  line: i + 1
  };
  update_cart(data);
}));

$(document).on("click", '#side_cart .qty .spinner .plus', (function (e) {
  e.preventDefault();
  var num = parseInt($(this).parent().find("input").val()) + 1;
  $(this).parent().find("input").val(num);

  var t = $(this),
    o = $(this).closest(".items"),
    i = (simply.cartJson.items, o.attr("data-item"));
 
  if (cn(i)) return console.error("Found error adding giftcard"), !1;
  i = parseInt(i);
  var s = parseInt($(".qty input", o).val()),
    a = simply.cartJson.items[i].properties,
    n = "yes";
  t.hasClass("gifted") && (n = "no"), a["gift-wrap"] = n;
  var data= {
  quantity: s,
  line: i + 1
  };
  update_cart(data)
}));

$(document).on("change", "#side_cart .product_qty ", (function(e) {
  e.preventDefault();
  var t = $(this),
      o = $(this).closest(".items"),
      i = (simply.cartJson.items, o.attr("data-item"));

  if (cn(i)) return console.error("Found error adding giftcard"), !1;
  i = parseInt(i);
  var s = parseInt($(".qty input", o).val()),
      a = simply.cartJson.items[i].properties,
      n = "yes";
  t.hasClass("gifted") && (n = "no"), a["gift-wrap"] = n;
  var data= {
    quantity: s,
    line: i + 1
  };
  update_cart(data);
}));

function moon_calc(moon_month,moon_date,moon_year){
  obj_moon_date = [];
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

    var moon_text = {
      "NL": "New Moon",
      "CA": "Waxing Crescent ",
      "1A": "Waxing Crescent ",
      "2A": "Waxing Crescent ",
      "3A": "Waxing Crescent ",
      "4A": "Waxing Gibbous ",
      "5A": "Waxing Gibbous ",
      "6A": "Waxing Gibbous",
      "7A": "Waxing Gibbous ",
      "PL": "Full Moon",
      "7D": "Waning Gibbous ",
      "6D": "Waning Gibbous ",
      "5D": "Waning Gibbous",
      "4D": "Waning Gibbous",
      "3D": "Waning Crescent ",
      "2D": "Waning Crescent ",
      "1D": "Waning Crescent ",
      "CD": "Waning Crescent ",
      "LE": "Lunar Eclipse ",
      "SE": "Solar Eclipse"
    };


    var moon_val = moon_text[moon];
    if (moon_val == undefined ) {
      $('.alert-message.modal_alert').show();
    }else{
      var month_name = {
        "01" : "January",
        "02" : "February",
        "03" : "March",
        "04" : "April",
        "05" : "May",
        "06" : "June",
        "07" : "July",
        "08" : "August",
        "09" : "September",
        "10" : "October",
        "11" : "November",
        "12" : "December"
      };

      var month = month_name[moon_month];

      var img = 'https://cdn.shopify.com/s/files/1/2486/3224/t/228/assets/'+moon+'.png';

      $('.moon_phase img').attr('src', img);
      $('.find-moon-form .image-with-text__image .responsive-image__image').attr('src', img);
      var result_date = month +' '+moon_date+', '+moon_year;

      var trimmed_next = $.trim(result_date);
      var handle_next = trimmed_next.replace(/[^a-z0-9-]/gi, '-'). replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();


      obj_moon_date = {"current_date":current,"handle_next":handle_next,"image_code":moon,"moon_val":moon_val,"result_date":result_date};
      // adds moon entry in moon-dates cookie

      add_moon_date(obj_moon_date);
    }
  }
});

};

$(document).ready(function () {
  $('.product-info').each(function () {
    if ($(this).hasClass('free_gift_product')) {
      free_gift_old = free_gift_variant_id
      free_gift_variant_id = '';
    }
  });  
})

$(document).on('click', '.remove', function () {

  var id = $(this).parent().find('.product-info').find('.id').val();
  
  var data = {
    quantity: 0,
    line: id
  }
  update_cart(data)
})
$(document).on('click', '.ajax-submit', function(e) {

  e.preventDefault();
  if (!$(this).hasClass('disabled')) {
    var $addToCartForm = $(this).closest('form');
    var $addToCartBtn = $addToCartForm.find('.add_cart');

    if (!$addToCartForm.find('input').hasClass('moon_phase')) {
      product_date = " ";
    }
    var p_num = $(".product_moon").attr('p_num');
    if(p_num > 0){
      for (let index = 1; index < p_num+1; index++) {
        var selector = ".phase-"+index;
        if($(selector).val() == ""){
          product_date = "";
        }
      }
    }
    if ($addToCartForm.find('div').hasClass('single-add-cart') || $(this).hasClass('related') || product_date != "") {

      $.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: $addToCartForm.serialize(),
        beforeSend: function() {
          $addToCartBtn.attr('disabled', 'disabled').addClass('disabled');
          $addToCartBtn.find('span.text').hide();
          $addToCartBtn.find('span.checkmark').fadeIn();
        },
        success: function(itemData) {

          window.setTimeout(function(){
            $addToCartBtn.removeAttr('disabled').removeClass('disabled');
            $addToCartBtn.find('.checkmark').hide();
            $addToCartBtn.find('span.text').fadeIn();
          }, 1000);

          $.ajax({
            url: '/cart.js',
            dataType: "json",
            cache: false,
            beforeSend: function() {
              $(".loading").fadeIn('slow');
            },
            success: function(cart) {
              var total_val = 0;
              if (free_gift_type == 'moon_stud') {
                total_val = cart.item_count;
              }else{
                total_val = cart.total_price;
              }
              if (total_val >= range && free_gift_variant_id != '' ) {
                $.ajax({
                  url: '/cart/add.js',
                  dataType: 'json',
                  cache: false,
                  type: 'post',
                  data: {
                    form_type: "product",
                    utf8: "✓",
                    id: free_gift_variant_id,
                    quantity: 1
                  },
                  success: function(itemData) {
                    $.ajax({
                      url: '/cart.js',
                      dataType: "json",
                      cache: false,
                      beforeSend: function() {
                        $(".loading").fadeIn('slow');
                      },
                      success: function(cart) {
                        $(".loading").fadeOut('slow');
                        setTimeout(function() {
                          simply.cartJson = cart
                          refreshCart(cart);
                          window.scrollTo(0,0);
                          $(".header-menu .grid__item a span").text(cart.item_count)
                          $('a.cart').trigger('click');
                        }, 500)
                      }
                    });
                  }
                });

              }else{
                free_gift_variant_id = free_gift_old;
                $(".loading").fadeOut('slow');
                setTimeout(function() {
                  simply.cartJson = cart
                  refreshCart(cart);
                  window.scrollTo(0,0);
                  $(".header-menu .grid__item a span").text(cart.item_count)


                $('a.cart').trigger('click');
                }, 500)
              }

              
            }
          });
        },
        error: function(XMLHttpRequest) {
          var response = eval('(' + XMLHttpRequest.responseText + ')');
          response = response.description;
          $addToCartForm.find('.product-alert').text(response);
          $addToCartForm.find('.product-alert').show();
          setTimeout(() => {
            $addToCartForm.find('.product-alert').hide();
          }, 5000);
          setTimeout(() => {
            $(".mini-cart .scroll-box").scrollTop(100);
          }, 400);

          $addToCartBtn.removeAttr('disabled').removeClass('disabled');
          $addToCartBtn.find('.checkmark').hide();
          $addToCartBtn.find('span.text').fadeIn();
        }
      });
    }else{
      $addToCartForm.find('.product-alert').show();
      setTimeout(() => {
        $addToCartForm.find('.product-alert').hide();
      }, 5000);
    }

  }
});

function update_cart(data) {

  $.ajax({
    url: '/cart/change.js',
    dataType: 'json',
    cache: false,
    type: 'post',
    data : data,
    success: function (itemData) {
      $.ajax({
        url: '/cart.js',
        dataType: "json",
        cache: false,
        beforeSend: function() {
          $(".loading").fadeIn('slow');
        },
        success: function(cart) {
          var free_gift_id = $('.free_gift_product').find('.id').val();
          var total_val = 0;
          if (free_gift_type == 'moon_stud') {
            total_val = cart.item_count;
          }else{
            total_val = cart.total_price;
          }
          if ( total_val < range+1 && free_gift_id != undefined ) {
            $.ajax({
              url: '/cart/change.js',
              dataType: 'json',
              cache: false,
              type: 'post',
              data: {
                quantity: 0,
                line: free_gift_id
              },
              success: function(itemData) {
                free_gift_variant_id = free_gift_old;
                $.ajax({
                  url: '/cart.js',
                  dataType: "json",
                  cache: false,
                  beforeSend: function() {
                    $(".loading").fadeIn('slow');
                  },
                  success: function(cart) {
                    refreshCart(cart);
                    $(".header-menu .grid__item a span").text(cart.item_count)
                    setTimeout(function() {
                      $(".loading").fadeOut('slow');
                    }, 500)
                  }
                });
              }
            });

          }else if ( total_val >= range && free_gift_variant_id != '' ) {
              $.ajax({
                url: '/cart/add.js',
                dataType: 'json',
                cache: false,
                type: 'post',
                data: {
                  form_type: "product",
                  utf8: "✓",
                  id: free_gift_variant_id,
                  quantity: 1
                },
                success: function(itemData) {
                  $.ajax({
                    url: '/cart.js',
                    dataType: "json",
                    cache: false,
                    beforeSend: function() {
                      $(".loading").fadeIn('slow');
                    },
                    success: function(cart) {
                      $(".loading").fadeOut('slow');
                      setTimeout(function() {
                        simply.cartJson = cart
                        refreshCart(cart);
                        window.scrollTo(0,0);
                        $(".header-menu .grid__item a span").text(cart.item_count)
                        $('a.cart').trigger('click');
                      }, 500)
                    }
                  });
                }
              });
          }else{
            free_gift_variant_id = free_gift_old;
            refreshCart(cart);
            $(".header-menu .grid__item a span").text(cart.item_count)
            setTimeout(function() {
              $(".loading").fadeOut('slow');
            }, 500)
          }
        }
      });
    }
  })
}

function refreshCart(cart) {
  $(".cart-list").hide();
  var html = '';
  if (cart.items.length == 0) {
    $('.cart_field').fadeOut();
    $('.empty_field').fadeIn();
  }else{
    $('.cart_field').fadeIn();
    $('.empty_field').fadeOut();
  }
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    var free_cls = '';

    if (item.id == free_gift_variant_id ) {
      var free_cls = 'free_gift_product';
      free_gift_old = free_gift_variant_id
      free_gift_variant_id = '';
    }

    html += '<li class="items" data-item="'+ i +'" data=key="'+item.key.replace(',',"_")+'" >';
    html += '<a class="remove"><img src="https://cdn.shopify.com/s/files/1/2486/3224/t/224/assets/close_ico.png?v=7795779005768485368"></a>';
    html += '<a href="'+item.url+'">';
    html += '<img class="product-img" src="'+item.featured_image.url+'">';
    html += '<div class="product-info '+ free_cls +'">';
    html += '<p class="name">'+item.product_title+'</p>';
    for (let i = 0; i < item.options_with_values.length; i++) {
      const option = item.options_with_values[i];
      html += '<p class="attribute color__dark_blue">'+ option.name + ':'+ option.value +'</p>';
    }
    var string = JSON.stringify(item.properties);
    var arr = JSON.parse(string);

    for (let index = 1; index < 7; index++) {
      var selector = 'Phase'+index;
      if (item.properties[selector] != undefined) {
        html += '<p class="attribute color__dark_blue">'+ selector + ': '+ item.properties[selector] +'</p>';
      }
    }
    if (item.properties['Engraving'] != undefined) {
      html += '<p class="attribute color__dark_blue">'+ 'Engraving : '+ item.properties['Engraving'] +'</p>';

    }
    html += '<p class="price">'+item.quantity+' x $'+item.final_price/100+'</p>';

    html += '<input type="hidden" class="id" value="'+  (i+1) +'"></div>';
    html += '<label for="updates_' + item.key + '" class="visually-hidden hide"> quantity </label>';
    if ( item.id == 8167037632617 ) {
      html += '<div class ="inline_displaying hide">';
    }else{
      html += '<div class ="inline_displaying">';
    }
    html += '<div class="qty cart_item"><div class="spinner"><div class="min">-</div>';
    html += '<input type="number" name="updates[]" id="updates_' + item.key + '" class="product_qty nojs" value="' + item.quantity + '" min="0" data-id="' + item.key +'">';
    html += '<div class="plus">+</div></div></div></div>';

    if (item.product_type != 'Gift wrap') {
      html += '<div class="main_gift_div"><div class ="gift_checkbox">';
      if (item.properties['gift-wrap'] == 'yes') {
        html += '<div class ="adding_gift gifted"><span tabindex="0" title="Remove Gift Wrap">Remove Gift Wrap</span></div>';
      }else{
        html +='<div class ="adding_gift"><span tabindex="0" title="Add Gift Wrap?">Add Gift Wrap?</span></div>';
      }

      html +='</div><div class ="view_gift_larger"><a>Preview Gift Wrap</a></div></div>';
    }
    html += '</li>';
  }
  $(".cart-list").html(html);
  $(".cart-list").show();
  

  $(".sub-total .price").text('$'+cart.total_price/100);
  $(".checkout p a").text(cart.total_price/100+' Moon Points!');
  if (free_gift_type == 'moon_stud') {
    var total_price = range;
    var progress = cart.item_count/total_price*100+'%';
    if (cart.item_count/total_price*100 >= 100) {
      var message = " ✓ Congratulations! You've earned FREE GIFT!";
    }else{
      var message = " Only "+(total_price-parseInt(cart.item_count)).toString()+" item away from FREE GIFT!";
    }
  }else{
    var total_price = range/100;
    var progress = cart.total_price/total_price+'%';
    if (cart.total_price/total_price >= 100) {
      var message = " ✓ Congratulations! You've earned FREE BIRTHDAY STONE!";
    }else{
      var message = " Only $"+(total_price-parseInt(cart.total_price/100)).toString()+".00 away from FREE BIRTHDAY STONE!";
    }
  }
  

  $('.progress-bar span').text(message);
  $('.progress').css('width', progress);

}

// adds moon entry in moon-dates cookie
function add_moon_date(obj_moon_date){
  var moon_dates = [];
  if($.cookie("moon_dates")){
    moon_dates = $.parseJSON($.cookie("moon_dates"));
  }

  //   var obj = moon_dates.find(o => o.current_date === obj_moon_date.current_date);


  var obj = {};//moon_dates.find(o => o.current_date === obj_moon_date.current_date);
  moon_dates.forEach(function(obj_date){
    if(obj_date.current_date === obj_moon_date.current_date && obj_date.occasion === obj_moon_date.occasion )
      obj = obj_date;
  });

  obj_index = moon_dates.indexOf(obj);
  if(obj_index > -1){
    $('#date-save-modal .modal_alert').removeClass('alert-success');
    $('#date-save-modal .modal_alert').addClass('alert-danger');
    $('#date-save-modal .modal_alert').text("* Selected date already exist!!");
    $('#date-save-modal .modal_alert').show();

    setTimeout(() => {
      $('.modal_alert').hide();
    }, 5000);
    var result = false;
  }else{
    moon_dates.splice(0, 0, obj_moon_date);
    $.cookie("moon_dates", JSON.stringify(moon_dates),{path:"/"});
    $('#date-save-modal .modal_alert').removeClass('alert-danger');
    $('#date-save-modal .modal_alert').addClass('alert-success');
    $('#date-save-modal .modal_alert').text('Save the date successfuly.');
    $('#date-save-modal .modal_alert').show();
    setTimeout(() => {
      $('#date-save-modal .modal_alert').hide();
    }, 5000);
    var result = true;
  }
  return result;
}

function validate_moon_date(obj_moon_date, selector){
  var moon_dates = [];
  if($.cookie("moon_dates")){
    moon_dates = $.parseJSON($.cookie("moon_dates"));
  }

  //   var obj = moon_dates.find(o => o.current_date === obj_moon_date.current_date);


  var obj = {};//moon_dates.find(o => o.current_date === obj_moon_date.current_date);
  moon_dates.forEach(function(obj_date){
    if(obj_date.current_date === obj_moon_date.current_date)
      obj = obj_date;
  });

  obj_index = moon_dates.indexOf(obj);
  if(obj_index > -1){
    $(selector).addClass('alert-danger');
    $(selector).removeClass('alert-success');
    $(selector).text("* Selected date already exist!!");
    $(selector).show();
    setTimeout(() => {
      $(selector).hide();
    }, 5000);
    var result = false;
  }else{
    var result = true;
  }
  return result;
}

function attach_moon_drop_html(){
  $(".header-left-links .my-moon .h8").text("My Moons");
  $(".moons .moon_list").html(create_moon_dates_html());

}

function create_moon_date_html(obj_moon_date){
  moon_html = "";
  img_path = "//cdn.shopify.com/s/files/1/2486/3224/t/3/assets/"+obj_moon_date.image_code+"_60x60.jpeg";
  moon_html = '<div class="custom-input-wrapper moon-inner clearfix custom-checkbox"><a href="javascript:void(0);" onclick="remove_moon_list($(this))" class="close" data-date="'+obj_moon_date.current_date+'"><img src="{{\'Close.png\'| asset_url}}"></a><input placeholder="name" id="custom-moon_'+obj_moon_date.handle_next+'" name="custom_moon" data-date="'+obj_moon_date.current_date+'" type="checkbox" class="check_moon" ><div class="custom-input-wrapper-inner"></div><label for="custom-moon_'+obj_moon_date.handle_next+'"><div class="image-wrap moon-image"><img src="'+img_path+'" data-result="'+obj_moon_date.image_code+'" alt="'+obj_moon_date.moon_val+'" /></div><div class="date-name"><h8 class="light">'+obj_moon_date.result_date+'</h8><h8 data-day="'+obj_moon_date.moon_val+'">'+obj_moon_date.moon_val+'</h8></div></label></div>';
  return moon_html;
}

function create_save_field(date, month, year) {
  if(month  < 10){
    var month_val = month.slice(1);
  }else{
    var month_val = month;
  }

  if(date  < 10){
    var date_val = date.slice(1);
  }else{
    var date_val = date;
  }

  obj_moon_date = [];
  var current = month_val+ "/" +date_val+ "/" +year;
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

      if (moon == undefined) {
          $('.modal_alert').show();
          setTimeout(() => {
            $('.modal_alert').hide();
          }, 5000);
      }else{
        $(".moon-code").text(moon);
        $('.start').hide()
        var img = 'https://cdn.shopify.com/s/files/1/2486/3224/t/228/assets/'+moon+'.png';
        var icon = 'https://cdn.shopify.com/s/files/1/2486/3224/t/228/assets/'+moon+'.svg';
        $('.modal_moon_phase_img').attr('src', img);
        $('.moon-icon img').attr('src', icon);
        var month_name = {
          "01" : "January",
          "02" : "February",
          "03" : "March",
          "04" : "April",
          "05" : "May",
          "06" : "June",
          "07" : "July",
          "08" : "August",
          "09" : "September",
          "10" : "October",
          "11" : "November",
          "12" : "December"
        };

        var month_val = month_name[month];
        $('.date-header p .date').text(date);
        $('.date-header p .month').text(month_val);
        $('.date-header p .year').text(year);

        var result_date = month_val +' '+ date +', '+year;

        var trimmed_next = $.trim(result_date);
        var handle_next = trimmed_next.replace(/[^a-z0-9-]/gi, '-'). replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();

        var moon_text = {
          "NL": "New Moon",
          "CA": "Waxing Crescent ",
          "1A": "Waxing Crescent ",
          "2A": "Waxing Crescent ",
          "3A": "Waxing Crescent ",
          "4A": "Waxing Gibbous ",
          "5A": "Waxing Gibbous ",
          "6A": "Waxing Gibbous",
          "7A": "Waxing Gibbous ",
          "PL": "Full Moon",
          "7D": "Waning Gibbous ",
          "6D": "Waning Gibbous ",
          "5D": "Waning Gibbous",
          "4D": "Waning Gibbous",
          "3D": "Waning Crescent ",
          "2D": "Waning Crescent ",
          "1D": "Waning Crescent ",
          "CD": "Waning Crescent ",
          "LE": "Lunar Eclipse ",
          "SE": "Solar Eclipse"
        };

        var moon_val = moon_text[moon];
        var handle = '/collections/'+moon_val.replace(' ','-').toLowerCase();

        $('.shop-date').attr('href', handle);
        $(".select-phase").attr('date-val', month+"/"+date+"/"+year)
        obj_moon_date = {"current_date":current,"handle_next":handle_next,"image_code":moon,"moon_val":moon_val,"result_date":result_date};
        // var result = validate_moon_date(obj_moon_date,'.modal_alert');

        $('.content-field').hide();
        $('.calendars').show();
        $('.save-field').fadeIn();

      }
    }
  });
}

function create_save_modal(date, month, year) {
  if(month  < 10){
    var month_val = month.slice(1);
  }else{
    var month_val = month;
  }

  if(date  < 10){
    var date_val = date.slice(1);
  }else{
    var date_val = date;
  }

  var current = month_val+ "/" +date_val+ "/" +year;
  obj_moon_date = [];
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

      if (moon == undefined) {
          $('.form_alert').show();
          setTimeout(() => {
            $('.form_alert').hide();
          }, 5000);
      }else{
        $(".moon-code").text(moon);
        $('.start').hide()
        var icon = 'https://cdn.shopify.com/s/files/1/2486/3224/t/228/assets/'+moon+'.svg';
        $('.moon-icon img').attr('src', icon);

        for (let i = 0; i < moon_phase_array.length; i++) {
          const element = moon_phase_array[i];
          if (element.id == moon) {
            var img = element.content.image;
            var title = element.content.title;
            var text = element.content.desc;
            $('.modal_moon_phase_img').attr('src', img);
            $('.save-field .content-info .mark').text(title);
            $('.save-field .content-info p:not(.mark)').text(text);
          }
        }

        var month_name = {
          "01" : "January",
          "02" : "February",
          "03" : "March",
          "04" : "April",
          "05" : "May",
          "06" : "June",
          "07" : "July",
          "08" : "August",
          "09" : "September",
          "10" : "October",
          "11" : "November",
          "12" : "December"
        };

        var month_val = month_name[month];
        $('.date-header p .date').text(date);
        $('.date-header p .month').text(month_val);
        $('.date-header p .year').text(year);

        var result_date = month_val +' '+ date +', '+year;

        var trimmed_next = $.trim(result_date);
        var handle_next = trimmed_next.replace(/[^a-z0-9-]/gi, '-'). replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();

        var moon_text = {
          "NL": "New Moon",
          "CA": "Waxing Crescent ",
          "1A": "Waxing Crescent ",
          "2A": "Waxing Crescent ",
          "3A": "Waxing Crescent ",
          "4A": "Waxing Gibbous ",
          "5A": "Waxing Gibbous ",
          "6A": "Waxing Gibbous",
          "7A": "Waxing Gibbous ",
          "PL": "Full Moon",
          "7D": "Waning Gibbous ",
          "6D": "Waning Gibbous ",
          "5D": "Waning Gibbous",
          "4D": "Waning Gibbous",
          "3D": "Waning Crescent ",
          "2D": "Waning Crescent ",
          "1D": "Waning Crescent ",
          "CD": "Waning Crescent ",
          "LE": "Lunar Eclipse ",
          "SE": "Solar Eclipse"
        };

        var moon_val = moon_text[moon];
        var handle = '/collections/'+moon_val.replace(' ','-').toLowerCase();


        $('.shop-date').attr('href', handle);
        obj_moon_date = {"current_date":current,"handle_next":handle_next,"image_code":moon,"moon_val":moon_val,"result_date":result_date};
        // var result = validate_moon_date(obj_moon_date, '.form_alert');
        var result = true;
        if (result) {
          var target = "#moon-phase";
          $(target).show();
          $(target).addClass("active");
          $(".dark-bg").show();
          $('.content-field').hide();
          $('.calendars').show();
          $('.save-field').fadeIn();

        }
      }
    }
  });
}

$(document).ready(function () {


  $(".update_cart_btn").click(function (e) {
    e.preventDefault();
    var $cart = $(this).closest('form');
    $(this).attr('disabled', 'disabled').addClass('disabled');
    $.ajax({
      url: '/cart/update.js',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: $cart.serialize(),
      success: function (data) {
        $('.alert-cart').text('Update cart Successfully !');
        $('.alert-cart').removeClass('alert-danger');
        $('.alert-cart').addClass('alert-success');
        $('.alert-cart').show();
        setTimeout(() => {
          $('.alert-cart').hide();
        }, 5000);
        location = '/cart';
      },
      error: function(XMLHttpRequest) {
        var response = eval('(' + XMLHttpRequest.responseText + ')');
        response = response.description;
        $('.alert-cart').text(response);
        $('.alert-cart').removeClass('alert-success');
        $('.alert-cart').addClass('alert-danger');
        $('.alert-cart').show();
        setTimeout(() => {
          $('.alert-cart').hide();
        }, 5000);

      }
    });
  })

  setTimeout(() => {
    var html = $(".collection-list-banner").html();

    $('#gf-products .grid__item:nth-child(5)').before(html);
}, 2000);

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  if(key == 'checkout_url'){
    var checkout_url = value;
    $(".return_url").val(checkout_url);
  }
});
});
