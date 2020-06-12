
var year='', month='', date='', history = [];

$( function() {
    $( ".datepicker" ).datepicker({
      startView: 2,
      defaultViewDate: {year: '2010'},
      startDate:'01/01/1919',
      endDate:'12/31/2030',
      maxViewMode: 2
    });
} );

$(".link-list .title").click(function(){
    $(this).parent().find("ul").slideToggle("fast");

    if($(this).find("i").hasClass("fa-plus")){
        $(this).find("i").addClass("fa-minus");
        $(this).find("i").removeClass("fa-plus");
    }else{
        $(this).find("i").removeClass("fa-minus");
        $(this).find("i").addClass("fa-plus");
    }
});

$('.slide_btn').click(function () {

  if (!$(this).hasClass('active')) {
    $(this).addClass('active');
  }else{
    $(this).removeClass('active');
  }
  $(this).parent().find('.slide_content').slideToggle();
});

$("a.month").click(function () {
  $('.product-moon-phase .special-phase').show();
  $(".date-header a").removeClass('active');
  $(this).addClass('active');
  $('.content-field').hide();
  $('.month-field').fadeIn();
  $('.content-field').removeClass("opened");
  $(".month-field").addClass('opened');
});

$("a.date").click(function () {
  $('.product-moon-phase .special-phase').show();
  $(".date-header a").removeClass('active');
  $(this).addClass('active');
  $('.content-field').hide();
  $('.date-field').fadeIn();
  $('.content-field').removeClass("opened");
  $(".date-field").addClass('opened');
});

$("a.year").click(function () {
  $('.product-moon-phase .special-phase').show();
  $(".date-header a").removeClass('active');
  $(this).addClass('active');
  $('.content-field').hide();
  $('.year-field').fadeIn();
  $('.content-field').removeClass("opened");
  $(".year-field").addClass('opened');
});


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
});

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

$('body').on('click', '.custom_button_cookie a.button-close', function () {
  $.cookie("permissionAccess","accepted", {path : '/'});
  $('.cookie_banner_popup').hide();
});

$(".custom_button_cookie a.button-not-allow").on('click', function () {
  $.cookie("permissionAccess","not_allow", {path : '/'});
  $('.cookie_banner_popup').hide();
});

$('.save-date').click(function () {
  if(!simply.customer_id) {
    // Not login, then show error, ask to login first
    var $el = $(this);
    var originalMsg = $el.closest('.modal').find('.alert-message').data('text');
    var logintext = $el.closest('.modal').find('.alert-message').data('logintext');
    if(logintext) {
      $el.closest('.modal').find('.alert-message').text(logintext).show();
      setTimeout(() => {
        $el.closest('.modal').find('.alert-message').hide().text(originalMsg);
      }, 5000);
    }
    return false;
  }
  if(!$('body').hasClass('stop-scroll')){
    $('body').addClass('stop-scroll');
  }
  // $('#moon-phase').hide();
  // $('#moon-phase').removeClass("active");
  $('#moon-phase').css('z-index', 50);
  var tempDate = obj_moon_date.current_date.split('/');
  // month
  var month_val_temp = tempDate[0];
  if(month_val_temp  < 10 && month_val_temp.indexOf('0') == -1){
      month_val_temp = 0 + tempDate[0];
  }
  // date
  var date_val_temp = tempDate[1];
  if(date_val_temp  < 10 && date_val_temp.indexOf('0') == -1){
    date_val_temp = 0 + tempDate[1];
  }
  var currentDateTemp = month_val_temp+ "/" +date_val_temp+ "/" +tempDate[2];
  $('#date-save-modal .moon-date').text(currentDateTemp);
  simply.showBackBg(true);
  $('#date-save-modal').show();

});

$('.save_ocassion_btn').click(function () {
  var occasion = $('.occasion').val();
  if(occasion != ''){
    obj_moon_date.occasion = occasion;
    var that = $(this);
    var data = {
      customer_id: simply.customer_id,
      email:simply.custEmail,
      moon_phase:obj_moon_date.image_code,
      moon_date:obj_moon_date.current_date,
      moon_occasion:obj_moon_date.occasion
    }
    var result = add_moon_date(obj_moon_date);
    if(result){
      simply.addWithDate(data,function(){

        $('.modal').find(".close").click();
        $('body').removeClass('stop-scroll');
        if (!$('#moon-phase').hasClass('active')) {
          simply.hideBackBg();
        }else{
          $('body').addClass('stop-scroll');
        }
        $('#moon-phase').css('z-index', 50);
        // $('.js .save-date').hide();
      });
    }
  } else {
    $('.occasion').parent().addClass('danger');
  }
});

$('.occasion').change(function () {
  $('.occasion_field').removeClass('danger');
});

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
    create_save_field(date, month, year);
   }
});
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
  month = parseInt(month_name[$(this).attr('date-for')]);
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
  $(".date-field li").removeClass('active');
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

$(".special-phase a").click(function (e) {
  e.preventDefault();
  var cls = "."+$(this).attr('data-target');
  $(this).parent().find('a').removeClass('active');
  var special_phase = $(this).attr('class');
  create_save_field('', '', '', special_phase);
});

$('#videoTara').click(function () {
  $('#videoTara').play()
});

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
  $('body').addClass('stop-scroll');
  $('#moon-phase').show();
  $('#moon-phase').addClass("active");
  $(".dark-bg").show();
});

$('body').on('click', "a.close", function(){
  simply.hideBackBg();
  $(this).parent().hide();
  $(this).parent().removeClass("active");
  $('body').removeClass('stop-scroll');
});

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

$('.filter_btn').click(function () {
  $('.filter_form').slideToggle();
});

$(document).on("click", "#side_cart .main_gift_div .gift_checkbox .adding_gift ", (function(e) {
  e.preventDefault();
  var t = $(this),
      o = $(this).closest(".items"),
      i = 0;
  i = o.find('.id').val();
  var s = parseInt($(".qty input", o).val()),
      a = simply.cartJson.items[i-1].properties,
      n = "yes";
  t.hasClass("gifted") && (n = "no"), a["gift-wrap"] = n;
  var data = {
    line: i,
    properties: a
  };
  update_cart(data);
}));

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
  if ($(this).parent().parent().parent().parent().find('.product-info').find('.engrave-num').val() != undefined) {
    var num = parseInt($(this).parent().parent().parent().parent().find('.product-info').find('.engrave-num').val());
  }else{
    var num = 0;
  }
  var id = i + 1;
  var engrave_id = $('.engraving').find('.product-info').find('.id').val();
  if (parseInt(id) <= parseInt(engrave_id) && s <= 0 ) {
    engrave_id = engrave_id - 1;
  }
  var engrave_quantity = parseInt($('.engraving .qty input').val()) - num;

  if (engrave_quantity == 0) {
    $('.engraving').remove()
  }

  var data= {
    quantity: s,
    line: id
  };

  if (engrave_id != undefined && num > 0) {
    var engrave_data = {
      quantity: engrave_quantity,
      line: engrave_id
    }
    update_cart(data, engrave_data)
  }else{
    update_cart(data)
  }

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
  if ($(this).parent().parent().parent().parent().find('.product-info').find('.engrave-num').val() != undefined) {
    var num = parseInt($(this).parent().parent().parent().parent().find('.product-info').find('.engrave-num').val());
  }else{
    var num  = 0;
  }
  var id = i + 1;
  var engrave_id = $('.engraving').find('.product-info').find('.id').val();

  var engrave_quantity = parseInt($('.engraving .qty input').val()) + num;

  if (engrave_quantity == 0) {
    $('.engraving').remove()
  }

  var data= {
    quantity: s,
    line: id
  };

  if (engrave_id != undefined && num > 0) {
    var engrave_data = {
      quantity: engrave_quantity,
      line: engrave_id
    }
    update_cart(data, engrave_data)
  }else{
    update_cart(data)
  }

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

        for (let i = 0; i < moon_phase_array.length; i++) {
          const moon_item = moon_phase_array[i];
          if (moon_item.id == moon) {
            var img = moon_item.content.image;
          }
        }

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

$(document).on('click', '.remove', function () {

  var id = $(this).parent().find('.product-info').find('.id').val();
  if ($(this).parent().find('.product-info').find('.engrave-num').val() != undefined) {
    var num = parseInt($(this).parent().find('.product-info').find('.engrave-num').val()) * $(this).parent().find('.product_qty').val();
  }else{
    var num = 0;
  }

  var engrave_id = $('.engraving').find('.product-info').find('.id').val();
  if (parseInt(id) <= parseInt(engrave_id) ) {
    engrave_id = engrave_id - 1;
  }
  var engrave_quantity = parseInt($('.engraving .qty input').val()) - num;
  $(this).parent().remove();
  if (engrave_quantity == 0) {
    $('.engraving').remove()
  }
  var data = {
    quantity: 0,
    line: id
  }
  if (engrave_id != undefined && num > 0) {
    var engrave_data = {
      quantity: engrave_quantity,
      line: engrave_id
    }
    update_cart(data, engrave_data)
  }else{
    update_cart(data)
  }
});

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
    var birthstone_select = "none"
    if ($('.birthstone_select').val() == undefined){
      var birthstone_select = " "
    }
    if($('.birthstone_select').val() != "none") {
      birthstone_select =  $('.birthstone_select').val();
    }
    var engrave_status = true;
    if (engrave_checked) {
      $('.engraving-input').each(function () {
        if ($(this).val() == '') {
          engrave_status = false;
        }
      })
    }
    var skymap_status = true;
    if ($addToCartForm.find('div').hasClass('single-add-cart')) {

      $('.perticular-product .line-item input').each(function () {
        if ($(this).val() == '') {
          skymap_status = false;
        }
      })
    }

    if (skymap_status && product_date != "" && birthstone_select != "none" && engrave_status) {

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
              var engraving_num = 0;
              var num = 0;
              if (itemData.properties != null) {
                if (itemData.properties['engraving'] != undefined && itemData.properties['engraving'] != ""){
                  engraving_num = itemData.properties['engraving'].length;
                  if (engraving_num > 10) {
                    num += 4;
                  }else if(engraving_num > 5){
                    num += 3;
                  }else if(engraving_num > 0){
                    num += 2;
                  }
                }
                if(itemData.properties['Engrave_ring'] != undefined && itemData.properties['Engrave_ring'] != ""){
                  if(itemData.properties['Engrave_ring'].length > 5){
                    num += 1;
                  }
                }
                if(itemData.properties['engraving2'] != undefined && itemData.properties['engraving2'] != "") {
                  engraving_num = itemData.properties['engraving2'].length;
                  if (engraving_num > 10) {
                    num += 4;
                  }else if(engraving_num > 5){
                    num += 3;
                  }else if(engraving_num > 0){
                    num += 2;
                  }
                }
  
                if(itemData.properties['Charm'] != undefined && itemData.properties['Charm'] != "") {
                  engraving_num = itemData.properties['Charm'].length;
                  if (engraving_num > 10) {
                    num += 4;
                  }else if(engraving_num > 5){
                    num += 3;
                  }else if(engraving_num > 0){
                    num += 2;
                  }
                }
              }
              

              if(engraving_num > 0 ){

                var post_data = {
                  'id': 13637743280233,
                  'quantity': num
                };
                $.ajax({
                  url: '/cart/add.js',
                  dataType: 'json',
                  cache: false,
                  type: 'post',
                  data: post_data,
                  beforeSend: function() {
                    $addToCartBtn.attr('disabled', 'disabled').addClass('disabled');
                    $addToCartBtn.find('span.text').hide();
                    $addToCartBtn.find('span.checkmark').fadeIn();
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
                        var total_val = 0;

                        if (free_gift_type == 'moon_stud') {
                          total_val = cart.item_count;
                        }else{
                          total_val = cart.total_price;
                        }

                        for (let i = 0; i < cart.items.length; i++) {
                          if (cart.items[i].product_type == 'letters') {
                            total_val = total_val - cart.items[i].quantity;
                          }
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
                          $(".loading").fadeOut('slow');
                          setTimeout(function() {
                            refreshCart(cart);
                            window.scrollTo(0,0);
                            $(".header-menu .grid__item a span").text(cart.item_count);
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
                var total_val = 0;
                if (free_gift_type == 'moon_stud') {
                  total_val = cart.item_count;
                }else{
                  total_val = cart.total_price;
                }
                for (let i = 0; i < cart.items.length; i++) {
                  if (cart.items[i].product_type == 'letters') {
                    total_val = total_val - cart.items[i].quantity;
                  }
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
                  $(".loading").fadeOut('slow');
                  setTimeout(function() {
                    refreshCart(cart);
                    window.scrollTo(0,0);
                    $(".header-menu .grid__item a span").text(cart.item_count)
                    $('a.cart').trigger('click');
                  }, 500);
                }
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

function update_cart(data, engrave_data = null) {

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
          if ( data.quantity != 0 ) {
            if (cart.items[data.line - 1].quantity != data.quantity) {
              var add_status = false;
            }else{
              var add_status = true;
            }
          }else{
            var add_status = true;
          }
          if (engrave_data != null && add_status ) {
            $.ajax({
              url: '/cart/change.js',
              dataType: 'json',
              cache: false,
              type: 'post',
              data : engrave_data,
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
                    for (let i = 0; i < cart.items.length; i++) {
                      if (cart.items[i].product_type == 'letters') {
                        total_val = total_val - cart.items[i].quantity;
                      }
                    }

                    if ( total_val < range+1 && free_gift_id != undefined ) {
                      if(free_gift_id > data.line){
                        free_gift_id = 1;
                      }
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
                          if (free_gift_old != undefined) {
                            free_gift_variant_id = free_gift_old;
                          }
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
                      if (free_gift_old != undefined) {
                        free_gift_variant_id = free_gift_old;
                      }
                      refreshCart(cart);
                      $(".header-menu .grid__item a span").text(cart.item_count)
                      setTimeout(function() {
                        $(".loading").fadeOut('slow');
                      }, 500)
                    }
                  }});
                }});
          }else{
            var free_gift_id = $('.free_gift_product').find('.id').val();
            var total_val = 0;
            if (free_gift_type == 'moon_stud') {
              total_val = cart.item_count;
            }else{
              total_val = cart.total_price;
            }
            for (let i = 0; i < cart.items.length; i++) {
              if (cart.items[i].product_type == 'letters') {
                total_val = total_val - cart.items[i].quantity;
              }
            }
            if ( total_val < range+1 && free_gift_id != undefined ) {
              if(free_gift_id > data.line){
                free_gift_id = 1;
              }
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
                  if (free_gift_old != undefined) {
                    free_gift_variant_id = free_gift_old;
                  }
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
                          refreshCart(cart);
                          window.scrollTo(0,0);
                          $(".header-menu .grid__item a span").text(cart.item_count)
                          $('a.cart').trigger('click');
                        }, 500);
                      }
                    });
                  }
                });
            }else{
              if (free_gift_old != undefined) {
                free_gift_variant_id = free_gift_old;
              }
              refreshCart(cart);
              $(".header-menu .grid__item a span").text(cart.item_count)
              setTimeout(function() {
                $(".loading").fadeOut('slow');
              }, 500)
            }
          }
        }
      });
    }
  });
}

function refreshCart(cart) {
  simply.cartJson = cart;
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
      if (item.id == free_gift_variant_id && item.final_price == 0 ) {
        var free_cls = 'free_gift_product';
        free_gift_old = free_gift_variant_id;
        free_gift_variant_id = '';
      }
      if (cart.items[i].product_type != 'letters') {
        html += '<li class="items" data-item="'+ i +'" data-key="'+item.key.replace(',',"_")+'" >';
      }else{
        html += '<li class="items engraving" data-item="'+ i +'" data-key="'+item.key.replace(',',"_")+'" >';
      }
      html += '<a class="remove"><img src="' + close_icon + '"></a>';
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
      var num = 0;
      var final_price = item.final_price;
      var engraving_num = 0;
      if (item.properties['engraving'] != undefined && item.properties['engraving'] != ""){
        engraving_num = item.properties['engraving'].length;
        html += '<p class="attribute color__dark_blue">'+ 'Engraving : '+ item.properties["engraving"] +'</p>';
        if (engraving_num > 10) {
          final_price += 2000;
          num += 4;
        }else if(engraving_num > 5){
          final_price += 1500;
          num += 3;
        }else if(engraving_num > 0){
          final_price += 1000;
          num += 2;
        }
      }
      if(item.properties['Engrave_ring'] != undefined && item.properties['Engrave_ring'] != ""){
        if (item.properties['Engrave_ring'].length > 5 ) {
          final_price += 500;
          num += 1;
        }
        html += '<p class="attribute color__dark_blue">'+ 'Engrave_ring : '+ item.properties['Engrave_ring'] +'</p>';
      }
      if(item.properties['engraving2'] != undefined && item.properties['engraving2'] != "") {
        engraving_num = item.properties['engraving2'].length;
        if (engraving_num > 10) {
          final_price += 2000;
          num += 4;
        }else if(engraving_num > 5){
          final_price += 1500;
          num += 3;
        }else if(engraving_num > 0){
          final_price += 1000;
          num += 2;
        }
        html += '<p class="attribute color__dark_blue">'+ 'Engraving2 : '+ item.properties['engraving2'] +'</p>';
      }

      if(item.properties['Charm'] != undefined && item.properties['Charm'] != "") {
        engraving_num = item.properties['Charm'].length;
        if (engraving_num > 10) {
          final_price += 2000;
          num += 4;
        }else if(engraving_num > 5){
          final_price += 1500;
          num += 3;
        }else if(engraving_num > 0){
          final_price += 1000;
          num += 2;
        }
        html += '<p class="attribute color__dark_blue">'+ 'Charm : '+ item.properties['Charm'] +'</p>';
      }

      if (item.properties['Birthstone']) {
        html += '<p class="attribute color__dark_blue">'+ 'Birthday stone : '+ item.properties['Birthstone'] +'</p>';
      }

      if (item.properties['Date']) {
        html += '<p class="attribute color__dark_blue">'+ 'Date : '+ item.properties['Date'] +'</p>';
      }

      if (item.properties['Location']) {
        html += '<p class="attribute color__dark_blue">'+ 'Location : '+ item.properties['Location'] +'</p>';
      }

      if (item.properties['Time']) {
        html += '<p class="attribute color__dark_blue">'+ 'Time : '+ item.properties['Time'] +'</p>';
      }


      html += '<p class="price">'+item.quantity+' x '+simply.formatMoney(final_price,simply.money_format)+'</p>';

      html += '<input type="hidden" class="id" value="'+  (i+1) +'"><input type="hidden" class="engrave-num" value="'+ num +'"></div>';
      html += '<label for="updates_' + item.key + '" class="visually-hidden hide"> quantity </label>';
      if ( item.id == 8167037632617 ) {
        html += '<div class ="inline_displaying hide">';
      }else{
        html += '<div class ="inline_displaying">';
      }
      html += '<div class="qty cart_item"><div class="spinner"><div class="min">-</div>';
      html += '<input type="number" name="updates[]" readonly id="updates_' + item.key + '" class="product_qty nojs" value="' + item.quantity + '" min="0" data-id="' + item.key +'">';
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
    var total_count = cart.item_count;
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].product_type == 'letters') {
        total_count -= cart.items[i].quantity;
      }
    }
    var progress = total_count/total_price*100+'%';
    if (total_count/total_price*100 >= 100) {
      var message = " ✓ Congratulations! You've earned a FREE GIFT!";
    }else{
      var message = " Only "+(total_price-parseInt(total_count)).toString()+" item away from a FREE GIFT!";
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
function add_moon_date(obj_moon_date, callback){
  var moon_dates = [];
  if($.cookie("moon_dates")){
    moon_dates = $.parseJSON($.cookie("moon_dates"));
  }

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
    var result = true;
  }
  return result;
}

function validate_moon_date(obj_moon_date, selector){
  var moon_dates = [];
  if($.cookie("moon_dates")){
    moon_dates = $.parseJSON($.cookie("moon_dates"));
  }

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

function create_save_field(date, month, year, special_phase = null) {
  $('.product-moon-phase .special-phase').hide();
  if (special_phase != null) {
    var moon = special_phase;

    $(".moon-code").text(moon);
    $('.start').hide()
    for (let i = 0; i < moon_phase_array.length; i++) {
      const moon_item = moon_phase_array[i];

      if (moon_item.id == moon) {
        var img = moon_item.content.image;
        var icon = moon_item.content.icon;
        var title = moon_item.content.title;
        var desc = moon_item.content.desc;
        $('.modal_moon_phase_img').attr('src', img);
        $('.moon-icon div').html(icon);
        $(".save-field .content-info .mark").text(title);
        $(".save-field .content-info p:last-child").text(desc);
      }
    }

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
    var product_selector = '.'+moon_val.toLowerCase().replace(' ', '-');

    $(".select-phase").attr('date-val', moon_val)
    $('.content-field').hide();
    $('.calendars').show();
    $('.save-field').fadeIn();
  } else {
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
          for (let i = 0; i < moon_phase_array.length; i++) {
            const moon_item = moon_phase_array[i];

            if (moon_item.id == moon) {
              var img = moon_item.content.image;
              var icon = moon_item.content.icon;
              var title = moon_item.content.title;
              var desc = moon_item.content.desc;
              $('.modal_moon_phase_img').attr('src', img);
              $('.moon-icon div').html(icon);
              $(".save-field .content-info .mark").text(title);
              $(".save-field .content-info p:last-child").text(desc);
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
            "LE": "Lunar Eclips",
            "SE": "Solar Eclipse"
          };

          var moon_val = moon_text[moon];
          var handle = '/collections/'+moon_val.replace(' ','-').toLowerCase()+'?date='+result_date;
          var product_selector = '.'+moon_val.toLowerCase().replace(' ', '-');
          if ($('.col_handle_name').hasClass(moon_val.toLowerCase().replace(' ', '-'))) {
            $('.col_handle_name').hide();
            $(product_selector).show();
          }

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
}

function create_save_modal(date, month, year) {

  var month_val_temp = month;
  if(month  < 10){
    month_val_temp = month.slice(1);
    var month_val = month;
  }else{
    var month_val = month;
  }

  var date_val_temp = date;
  if(date  < 10){
    date_val_temp = date.slice(1);
    var date_val = date;
  }else{
    var date_val = date;
  }

  var current = month_val+ "/" +date_val+ "/" +year;
  var currenttemp = month_val_temp+ "/" +date_val_temp+ "/" +year;

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
      var moon = data[currenttemp];

      if (moon == undefined) {
          $('.form_alert').show();
          setTimeout(() => {
            $('.form_alert').hide();
          }, 5000);
      }else{
        $(".moon-code").text(moon);
        $('.start').hide()

        for (let i = 0; i < moon_phase_array.length; i++) {
          const element = moon_phase_array[i];
          if (element.id == moon) {
            var img = element.content.image;
            var title = element.content.title;
            var text = element.content.desc;
            var icon = element.content.icon;
            $('.moon-icon div').html(icon);
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
        var handle = '/collections/'+moon_val.replace(' ','').toLowerCase()+'?date='+result_date;


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

simply.displySelectedOcassion = function(){
  var guid = simply.wishlistGuId;
  var data = {
    customer_id:simply.customer_id
  }
  var params = {
    type: 'POST',
    url: '/apps/moonglow/api/getAllUserFavourite',
    headers:{
      "guid":guid
    },
    data: data,
    dataType: 'json',
    success: function(res) {
      if(res.status == "0"){
        var data = res.data;
        var select = $(".saved-dates");
        select.each(function(index, el) {
         $(el).empty();
         if(res.data.length > 0){
          $(el).append('<option value="">Or select from your saved dates');
          for(let i=0 ; i<res.data.length ; i++){
            let date = data[i].moon_date;
            if(date.indexOf('-') > -1) {
              date = date.replace(/-/g,'/');
            }
            let date1 = date.replace("-","/");
            let date2 = date1.replace("-","/");
            // var option = '<option value='+data[i].id+' data-val='+date2+"-"+data[i].moon_occasion+"-"+data[i].moon_phase+'>'+date2+" - "+data[i].moon_occasion+" - "+data[i].moon_phase+'</option>';
            var option = '<option value='+date+' data-val='+date2+"-"+data[i].moon_occasion+"-"+data[i].moon_phase+'>'+date2+" - "+data[i].moon_occasion+" - "+data[i].moon_phase+'</option>';
            $(el).append(option);
          }
        }
        else{
          $(el).append('<option value="">No dates saved');
        }
      });
      }
    },
    error: function(error) {
      console.log(error);
    }

  };
  $.ajax(params);
};

simply.addWithDate = function(custData,callback){
  var guid = simply.wishlistGuId;
  var params = {
    type: 'POST',
    url: '/apps/moonglow/api/favorite',
    headers:{
      "guid":guid
    },
    data: custData,
    dataType: 'json',
    success: function(res) {
      if(res.status == '1'){
        $('#date-save-modal .modal_alert').removeClass('alert-success');
        $('#date-save-modal .modal_alert').addClass('alert-danger');
        $('#date-save-modal .modal_alert').text(res.message);
        $('#date-save-modal .modal_alert').show();
      } else {
        $('#date-save-modal .modal_alert').removeClass('alert-danger');
        $('#date-save-modal .modal_alert').addClass('alert-success');
        $('#date-save-modal .modal_alert').text('Save the date successfuly.');
        $('#date-save-modal .modal_alert').show();
        simply.displySelectedOcassion();
      }
      setTimeout(() => {
        $('#date-save-modal .modal_alert').hide();
        if(callback && typeof callback === 'function') {
          callback(res);
        }
      }, 5000);
    },
    error: function(error) {
      console.log(error);
    }
  };
  $.ajax(params);
};

simply.removeWithDate = function(removeCustDate){
  var guid = simply.wishlistGuId;
  var params = {
    type: 'POST',
    url: '/apps/moonglow/api/deleteFavourite',
    headers:{
      "guid":guid
    },
    data: removeCustDate,
    dataType: 'json',
    success: function(res) {
      $(".favDates option:selected").remove();
      $(".remove_fav_date").remove();
      simply.displySelectedOcassion();
    },
    error: function(error) {
      console.log(error);
    }

  };
  $.ajax(params);
};

simply.showBackBg = function(isWhite){
  if(isWhite) {
    $('.dark-bg').addClass('dark-bg-white')
  }
  $('.dark-bg').show();
}
simply.hideBackBg = function(){
  $('.dark-bg').removeClass('dark-bg-white').hide();
}

window.onFoursixtyCartAdded = function (product){
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
        refreshCart(cart);
        window.scrollTo(0,0);
        $(".header-menu .grid__item a span").text(cart.item_count)
        $('a.cart').trigger('click');
      }, 500)
    }
  });
}

// document ready
$(document).ready(function () {

  if ($.cookie("permissionAccess") === undefined) {
    $('.cookie_banner_popup').show();
  }

  $('.s4com-helpcenter .aa-input').keypress(function (e) {
      if(e.keyCode == 13){
        e.preventDefault();
      }
  });

  if ($('body').innerWidth() < 768) {
    var height = $('#shopify-section-header').outerHeight();
    var height_simple = $('#shopify-section-header-simple').outerHeight();
    if (height != undefined) {
      $('#MainContent').css('margin-top', height);
    }else{
      $('#MainContent').css('margin-top', height_simple);
    }
  }

  $.ajax({
    type: "Get",
    url: moon_eclipse_url,
    success: function (response) {
      moon_phase_data = response;
    }
  });

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
  });
  $(".menu .link-list .active").click(function (e) {
    e.preventDefault();
    $(".menu .link-list li:not(.active)").fadeToggle();
  });
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

  $('#datepicker').change(function () {
    $('.datepicker-dropdown').hide();
  })
  $('.datepicker').change(function () {
    $('.datepicker-dropdown').hide();
  })
  if ($.cookie('moon_dates')) {
    var moon_dates = $.parseJSON($.cookie("moon_dates"));
    var html = "<option>Or select from your saved dates</option>";
    for (let index = 0; index < moon_dates.length; index++) {
      const element = moon_dates[index];
      if (index == 0) {
        for (let i = 0; i < moon_phase_array.length; i++) {
          const moon_item = moon_phase_array[i];
          if (moon_item.id == element.image_code) {
            var moon_img = moon_item.content.image;
            var icon = moon_item.content.icon;
          }
        }
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text_title .find_moon_pannel .date_picker h5').text(element.result_date);
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text__image img').attr('src', moon_img);
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text__image img').attr('srcset', moon_img);
        $('#shopify-section-collection-moon-section .collection-image-text .image-with-text_title .find_moon_pannel .moon-phase').css("background", icon);
      }

      html += "<option value="+ element.current_date +">"+element.current_date+"-"+element.occasion+"-"+element.moon_val+"</option>";
    }
  }

  $('.product-info').each(function () {
    if ($(this).hasClass('free_gift_product')) {
      free_gift_old = free_gift_variant_id;
      free_gift_variant_id = '';
    }
  });

  var moon_text = {
    "new moon" : "NL",
    "waxing crescent" : "CA",
    "waxing crescent" : "1A",
    "waxing crescent" : "2A",
    "waxing crescent" : "3A",
    "waxing gibbous" : "4A",
    "waxing gibbous" : "5A",
    "waxing gibbous" : "6A",
    "waxing gibbous" : "7A",
    "full moon" : "PL",
    "waning gibbous" : "7D",
    "waning gibbous" : "6D",
    "waning gibbous" : "5D",
    "waning gibbous" : "4D",
    "waning crescent" : "3D",
    "waning crescent" : "2D",
    "waning crescent" : "1D",
    "waning crescent" : "CD",
    "lunar eclipse" : "LE",
    "solar eclipse" : "SE"
  };
  setTimeout(() => {
    if (indecator != undefined) {
      var id = moon_text[indecator];
      for (let i = 0; i < moon_phase_array.length; i++) {
        const element = moon_phase_array[i];

        if(element.id == id){
          var url = window.location.href;
          var arr = url.split('?date=').reverse();
          if(arr[1] != undefined){
            var date = decodeURI(arr[0]).replace("%2C", ", ");
          }else{
            var date = "";
          }
          $('#shopify-section-collection-moon-section .image-with-text__image img').attr('src', element.content.image);
          $('#shopify-section-collection-moon-section .find_moon_pannel .moon-phase').html(element.content.icon);
          $('#shopify-section-collection-moon-section .find_moon_pannel .date_picker h5').html(date);
          $('#shopify-section-collection-moon-section .image-with-text_title h3').text(element.content.title);
          $('#shopify-section-collection-moon-section .image-with-text_title p:last-child').text(element.content.desc);
        }
      }
    }
  }, 500);

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

  if(!cn(simply.customer_id)){
    simply.displySelectedOcassion();
  }

  var quantity = 0;
  var gift_status = false;
  $('.responsive-table-row .qty').each(function () {
    if (!$(this).parent().parent().hasClass('engraving_cart') && !$(this).parent().parent().hasClass('gift-row')) {
      quantity += parseInt($(this).val());
    }

    if ($(this).parent().parent().hasClass('gift-row')) {
      gift_status = true;
    }
  })

  if (quantity < 2 && gift_status) {
    if ($('.gift-row .remove_cart').attr('href') != undefined) {
      window.location = $('.gift-row .remove_cart').attr('href');
    }

  }else if(quantity > 1 && !gift_status){
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
          window.location = '/cart';
        }
      });
  }

  $('.remove_cart').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().hide();
    var engrave = parseInt($(this).parent().parent().find('.engrave_num').val()) * parseInt($(this).parent().parent().find('.qty').val());
    $(this).parent().parent().find('.qty').val(0);
    var total_engrave = $('.engraving_cart .qty').val();
    $('.engraving_cart .qty').val(total_engrave - engrave);
    $('.form').submit();
  })

  $('.remove_mobile_cart').click(function (e) {
    e.preventDefault();
    var cls = $(this).attr('data-target');
    $(cls).parent().parent().hide();
    var engrave = parseInt($(cls).parent().parent().find('.engrave_num').val()) * parseInt($(cls).parent().parent().find('.qty').val());
    $(cls).parent().parent().find('.qty').val(0);
    var total_engrave = $('.engraving_cart .qty').val();
    $('.engraving_cart .qty').val(total_engrave - engrave);
    $('.form').submit();
  })

  $('.product-item .qty_mobile').change(function (e) {

    e.preventDefault();
    var cls = $(this).attr('data-target');
    $(cls).val($(this).val());
    var engraving_num = 0;
    var quantity = 0;
    var gift_status = false;
    $('.responsive-table-row .qty').each(function () {
      engraving_num += $(this).val() * $(this).parent().find('.engrave_num').val()
    });

    $('.engraving_cart .qty').val(engraving_num);
    $('.form').submit();
  })

  $('.responsive-table-row .qty').change(function (e) {
    e.preventDefault();
    var engraving_num = 0;
    var quantity = 0;
    var gift_status = false;
    $('.responsive-table-row .qty').each(function () {
      engraving_num += $(this).val() * $(this).parent().find('.engrave_num').val()
    });

    $('.engraving_cart .qty').val(engraving_num);
    $('.form').submit();
  })
})
