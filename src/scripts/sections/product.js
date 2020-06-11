/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';
import {formatMoney} from '@shopify/theme-currency';
import {register} from '@shopify/theme-sections';
import {forceFocus} from '@shopify/theme-a11y';

const classes = {
  hide: 'hide',
};

const keyboardKeys = {
  ENTER: 13,
};

const selectors = {
  submitButton: '[data-submit-button]',
  submitButtonText: '[data-submit-button-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  priceWrapper: '[data-price-wrapper]',
  imageWrapper: '[data-product-image-wrapper]',
  visibleImageWrapper: `[data-product-image-wrapper]:not(.${classes.hide})`,
  imageWrapperById: (id) => `${selectors.imageWrapper}[data-image-id='${id}']`,
  productForm: '[data-product-form]',
  productPrice: '[data-product-price]',
  thumbnail: '[data-product-single-thumbnail]',
  thumbnailById: (id) => `[data-thumbnail-id='${id}']`,
  thumbnailActive: '[data-product-single-thumbnail][aria-current]',
  product_detail: 'product_detail',
};

register('product', {
  async onLoad() {
    const productFormElement = document.querySelector(selectors.productForm);

    this.product = await this.getProductJson(
      productFormElement.dataset.productHandle,
    );
    this.productForm = new ProductForm(productFormElement, this.product, {
      onOptionChange: this.onFormOptionChange.bind(this),
    });

    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onThumbnailKeyup = this.onThumbnailKeyup.bind(this);

    this.container.addEventListener('click', this.onThumbnailClick);
    this.container.addEventListener('keyup', this.onThumbnailKeyup);
  },

  onUnload() {
    this.productForm.destroy();
    this.removeEventListener('click', this.onThumbnailClick);
    this.removeEventListener('keyup', this.onThumbnailKeyup);
  },

  getProductJson(handle) {
    return fetch(`/products/${handle}.js`).then((response) => {
      return response.json();
    });
  },

  onFormOptionChange(event) {
    const variant = event.dataset.variant;

    this.renderImages(variant);
    this.renderPrice(variant);
    this.renderComparePrice(variant);
    this.renderSubmitButton(variant);

    this.updateBrowserHistory(variant);
  },

  onThumbnailClick(event) {
    const thumbnail = event.target.closest(selectors.thumbnail);

    if (!thumbnail) {
      return;
    }

    event.preventDefault();

    this.renderFeaturedImage(thumbnail.dataset.thumbnailId);
    this.renderActiveThumbnail(thumbnail.dataset.thumbnailId);
  },

  onThumbnailKeyup(event) {
    if (
      event.keyCode !== keyboardKeys.ENTER ||
      !event.target.closest(selectors.thumbnail)
    ) {
      return;
    }

    const visibleFeaturedImageWrapper = this.container.querySelector(
      selectors.visibleImageWrapper,
    );

    forceFocus(visibleFeaturedImageWrapper);
  },

  renderSubmitButton(variant) {
    const submitButton = this.container.querySelector(selectors.submitButton);
    const submitButtonText = this.container.querySelector(
      selectors.submitButtonText,
    );

    if (!variant) {
      submitButton.disabled = true;
      submitButtonText.innerText = theme.strings.unavailable;
    } else if (variant.available) {
      submitButton.disabled = false;
      submitButtonText.innerText = theme.strings.addToCart;
    } else {
      submitButton.disabled = true;
      submitButtonText.innerText = theme.strings.soldOut;
    }
  },

  renderImages(variant) {
    if (!variant || variant.featured_image === null) {
      return;
    }

    this.renderFeaturedImage(variant.featured_image.id);
    this.renderActiveThumbnail(variant.featured_image.id);
  },

  renderPrice(variant) {
    const priceElement = this.container.querySelector(selectors.productPrice);
    const priceWrapperElement = this.container.querySelector(
      selectors.priceWrapper,
    );

    priceWrapperElement.classList.toggle(classes.hide, !variant);

    if (variant) {
      priceElement.innerText = formatMoney(variant.price, theme.moneyFormat);
    }
  },

  renderComparePrice(variant) {
    if (!variant) {
      return;
    }

    const comparePriceElement = this.container.querySelector(
      selectors.comparePrice,
    );
    const compareTextElement = this.container.querySelector(
      selectors.comparePriceText,
    );

    if (!comparePriceElement || !compareTextElement) {
      return;
    }

    if (variant.compare_at_price > variant.price) {
      comparePriceElement.innerText = formatMoney(
        variant.compare_at_price,
        theme.moneyFormat,
      );
      compareTextElement.classList.remove(classes.hide);
      comparePriceElement.classList.remove(classes.hide);
    } else {
      comparePriceElement.innerText = '';
      compareTextElement.classList.add(classes.hide);
      comparePriceElement.classList.add(classes.hide);
    }
  },

  renderActiveThumbnail(id) {
    const activeThumbnail = this.container.querySelector(
      selectors.thumbnailById(id),
    );
    const inactiveThumbnail = this.container.querySelector(
      selectors.thumbnailActive,
    );

    if (activeThumbnail === inactiveThumbnail) {
      return;
    }

    inactiveThumbnail.removeAttribute('aria-current');
    activeThumbnail.setAttribute('aria-current', true);
  },

  renderFeaturedImage(id) {
    const activeImage = this.container.querySelector(
      selectors.visibleImageWrapper,
    );
    const inactiveImage = this.container.querySelector(
      selectors.imageWrapperById(id),
    );

    activeImage.classList.add(classes.hide);
    inactiveImage.classList.remove(classes.hide);
  },

  updateBrowserHistory(variant) {
    const enableHistoryState = this.productForm.element.dataset
      .enableHistoryState;

    if (!variant || enableHistoryState !== 'true') {
      return;
    }

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);
  },
});


$('.select-pannel .moon_phase').each(function () {

  $(this).click(function () {
    $('#moon-phase').show();
    $('body').addClass('stop-scroll');
    $('#moon-phase').addClass("active");
    $('#moon-phase').addClass("product-moon-phase");
    $('#moon-phase').attr('data-target', $(this).attr('data-target'));
    $('#moon-phase .special-phase').show();
    $(".dark-bg").show();
  });

  $(this).change(function () {

    product_date = $(this).val();
    var date = $(this).val().split('/');
    var chain = $('.js label.active').attr('for');
    $('.js .save-date').hide();
    var date_cls = "."+$(this).attr('data-target')+"-save-date-button";
    find_variant(date[0],date[1],date[2], chain, $(this).parent().parent().find('.mark-img').find('img.moon_image'),date_cls);

  });
});
$('#moon-phase .select-phase').click(function () {

  var date_val = $(this).attr('date-val');
  var target = '.'+$('#moon-phase').attr('data-target');
  var img_target = $(target).parent().parent().find('.mark-img').find('img.moon_image');
  var date_val_target = $(target).parent().find('.moon_phase_val');
  $(target).val(date_val);
  var chain = $('.js label.active').attr('for');
  var date_cls = "."+$(target).attr('data-target')+"-save-date-button";

  if (date_val == 'Solar Eclipse' | date_val == 'Lunar Eclipse') {
    product_date = date_val;
    if (date_val == 'Solar Eclipse') {
      var sp_val = 'SE';
    }else{
      var sp_val = 'LE';
    }
    find_variant_special(sp_val, chain, img_target);
    date_val_target.val(sp_val);
    $('body').removeClass('stop-scroll');
    $('#moon-phase').hide();
    $('#moon-phase .start').show();
    $('#moon-phase .content-field li').removeClass('active');
    $("#moon-phase .calendars").hide();
    $("#moon-phase .save-field").hide();
    $("#moon-phase .start-btn").trigger('click');
    $('#moon-phase').removeClass("active");
    $(".dark-bg").hide();
    $('.save-date ').hide();
  } else {
    product_date = date_val;
    var date = date_val.split('/');

    find_variant(date[0],date[1],date[2], chain, img_target,date_val_target, date_cls);
    $('body').removeClass('stop-scroll');
    $('#moon-phase').hide();
    $('#moon-phase .start').show();
    $('#moon-phase .content-field li').removeClass('active');
    $("#moon-phase .calendars").hide();
    $("#moon-phase .save-field").hide();
    $("#moon-phase .start-btn").trigger('click');
    $('#moon-phase').removeClass("active");
    $(".dark-bg").hide();
  }

});

$(".moon_phase_cookie .saved-dates").change(function () {
  if( $(this).val() != "" ){
    var date = $(this).val().split('/');
    var target = "."+$(this).attr('data-target');
    $(target).val($(this).val());
    var chain = $('.js label.active').attr('for');
    var date_val_target = $(target).parent().find('.moon_phase_val');
    find_variant(date[0],date[1],date[2], chain, $(target).parent().parent().find('.mark-img').find('img.moon_image'),date_val_target);
    product_date = $(this).val();
    $(this).closest('.js').find('.save-date').show();
  }
});

$(".js label").click(function () {
  $(".js label").removeClass('active');
  $(this).addClass('active');
  var date = [];
  if ($(".moon_phase").val() != '') {
    date = $('.moon_phase').val().split('/');
  }
  var chain = $(this).attr('for');
  if (date[2] != undefined ) {
    find_variant(date[0],date[1],date[2], chain);
  }else{
    var sdate = $('.moon_phase_val').val()
    find_variant_special(sdate, chain);
  }
});
$("#thumbs-carousel").owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  merge:true,
  dotsEach: true,
  responsive:{
    320:{
      item:3,
      mergeFit:true
    },
    600:{
      item:5,
      mergeFit:true
    }
  }
});
$('.engrange_checkbox').click(function () {
  if ($(this).hasClass('checked')){
    engrave_checked = false;
    $(this).removeClass('checked')
    $(".engraving_form").fadeOut();
    $('.engraving-input').val('');
    $('.engraving-input').removeAttr('name');
  } else {
    engrave_checked = true;
    $(this).addClass('checked')
    $('.engraving_form').fadeIn();
    $('.engraving-input.ring').attr('name', 'properties[Engrave_ring]');
    $('.engraving-input.first').attr('name', 'properties[engraving]');
    $('.engraving-input.second').attr('name', 'properties[engraving2]');
    $('.engraving-input.charm').attr('name', 'properties[Charm]');
  }
});

$(document).ready(function () {
  setTimeout(() => {
    var tmp = $('.title .text-m').text().split(" ");
    var review_sec = '('+tmp[0]+')';

    $('.title .text-m').html(review_sec);

    $('.product-desc div').each(function () {
      if (!$(this).hasClass('product_description')) {
        var title = $(this).attr('class');
        if ($(this).hasClass('product_detail')) {
          title = 'Details';
        }
        if ($(this).hasClass('product_more_info')) {
          title = 'More info';
        }
        var desc_content = $(this).html();
        var desc_html = '<div class="slide-pannel"><div class="heading"><a class="toggle_btn">'+title+'</a></div><div class="body">'+desc_content+'</div></div>';
        $(this).html(desc_html);
      }else{
        desc = $(this).children().text();

        if (desc.length > 200) {
          var txt = desc.slice(0, 200);
          $(this).html(txt);
          $(this).after('<a class="more">Read more</a>');
        }
      }
    })
    $('.slide-pannel .heading .toggle_btn').click(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
      }
      $(this).parent().parent().find('.body').slideToggle();
    });

    $('.more').click(function () {

      $(".product_description").text(desc);
      $(this).hide();
    });
  }, 2000);

  $('.chain-type').change(function () {
    var id = "#"+$(this).val();
    var variant = $(id).val();
    $('#variant_id').val(variant);
  });

});


$(document).ready(function () {
  var date_val = "";
  var time_val = "";
  var location_val = "";
  $('.astro-date .shop-moon-drop select').change(function () {
    date_val = "";
    $('.astro-date .shop-moon-drop select').each(function () {
      if($(this).val() != ''){
        date_val += '/'+$(this).val();
      }else{
        date_val = "";
      }
    });
    if (date_val.length > 8) {
      $('.line-item #line_date').val(date_val.slice(1));
    }else{
      $('.line-item #line_date').val("");
    }

  });
  $('.astro-location input').change(function () {
    location_val = "";
    $('.astro-location input').each(function () {
      if($(this).val() != '' && location_val != 'empty'){
        location_val += ',' + $(this).attr('placeholder') + ':' + $(this).val();
      }else{
        location_val = "empty";
      }
    });
    if (location_val.length > 20) {
      $('.line-item #line_location').val(location_val.slice(1));
    }else{
      $('.line-item #line_location').val("");
    }
  });
  $('.astro-time .shop-moon-drop select').change(function () {
    time_val  ='';
    $('.astro-time .shop-moon-drop select').each(function () {
      if($(this).val() != ''){
        if($(this).val() == 'AM' | $(this).val() == 'PM'){
          time_val +=  " "+$(this).val();
        }else{
          time_val += ":"+$(this).val();
        }
      }else{
        time_val = "";
      }
    });
    if (time_val.length >  7) {
      $('.line-item #line_time').val(time_val.slice(1));
    }else{
      $('.line-item #line_time').val("");
    }
  });
});

function find_variant(moon_month,moon_date,moon_year, chain, query = 'null', query_date = 'null', cls = 'null'){
  obj_moon_date = [];

  var month_val_temp = moon_month;
  if(moon_month  < 10){
    if( moon_month.slice(0,1) != 0){
      var month_val =  moon_month.slice(0,1);
    }else{
      month_val_temp = moon_month.slice(1);
      var month_val = moon_month;
    }
  }else{
    var month_val = moon_month;
  }

  var date_val_temp = moon_date;
  if(moon_date  < 10){
    if(moon_date.slice(0,1) != 0){
      var date_val = moon_date.slice(0,1);
    }else{
      date_val_temp = moon_date.slice(1);
      var date_val = moon_date;
    }

  }else{
    var date_val = moon_date;
  }

  var current = month_val+ "/" +date_val+ "/" +moon_year;
  var currenttemp = month_val_temp+ "/" +date_val_temp+ "/" +moon_year;
  $.ajax({
    type: "GET",
    url: moonglow_path,
    datatype: "json",
    beforeSend: function() {
      // setting a timeout
      $(".loader-section").show();
    },
    success: function(data){

      setTimeout(() => {
        $(".loader-section").hide();
      }, 1000);
      var moon = data[currenttemp];

      var moon_phase = '';
      moon_phase = select_moon_phase(moon_month+"/"+moon_date+"/"+moon_year);
      if (moon != undefined && query != 'null' ) {
        for (let i = 0; i < moon_phase_array.length; i++) {
          const moon_item = moon_phase_array[i];
          if (moon_item.id == moon) {
            var img = moon_item.content.image;
          }
        }

        query.attr('src', img);
        if (query_date != 'null') {
          query_date.val(current+"--"+moon);
        }
        query_date.parent().parent().parent().find('.phase-name').hide();
        if (moon_phase == 'LE' | moon_phase == 'SE') {
          var class_moon = '.'+moon_phase;
          query_date.parent().parent().parent().find('.phase-name').show();
          query_date.parent().parent().parent().find('.phase-name').find('span').hide();
          query_date.parent().parent().parent().find('.phase-name').find(class_moon).show();
          query_date.parent().parent().parent().find('.phase-name').show();
        }

        $('.scroll-box .moon_image').attr('src', img);
        $('.scroll-box .moon_image').trigger('click');
        setTimeout(() => {
          $('.main-image .moon_image').attr('src', img);

        }, 500);

      }

      if (chain == undefined) {
        chain ='';
      }

      var id =("#"+moon+'-'+chain).toString().replace(" ", "");
      var variant = $(id).val();
      if (variant != undefined ) {
        $('#variant_id').val(variant);
      }else if (chain != '') {
        variant = $('#'+chain).val();

        $('#variant_id').val(variant);
      }else if($('#DefaultTitle-').val() != undefined ) {
        $('#variant_id').val($('#DefaultTitle-').val());
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

      var result_date = month +' '+moon_date+', '+moon_year;
      var moon_val = moon_text[moon];
      if (moon_val != undefined ) {
        var handle = '.collection_products_main .container .'+moon_val.replace(' ','-').toLowerCase();
      }
      obj_moon_date = {"current_date":current,"handle_next":handle,"image_code":moon,"moon_val":moon_val,"result_date":result_date};

      $('.collection_products_main').show();
      $('.col_handle_name').removeClass('active');
      $(handle).addClass("active");
      $('.datepicker-dropdown').hide();

      if(obj_moon_date.current_date != ''){
        $(cls).show();
      }
    }
  });
};

function find_variant_special(date, chain, query = 'null'){
  obj_moon_date = [];

    var moon = date;

    if (moon != undefined && query != 'null' ) {
      for (let i = 0; i < moon_phase_array.length; i++) {
        const moon_item = moon_phase_array[i];
        if (moon_item.id == moon) {
          var img = moon_item.content.image;
        }
      }

      query.attr('src', img);

      $('.scroll-box .moon_image').attr('src', img);
      $('.scroll-box .moon_image').trigger('click');
      setTimeout(() => {
        $('.main-image .moon_image').attr('src', img);

      }, 500);

    }

    if (chain == undefined) {
      chain ='';
    }

    var id =("#"+moon+'-'+chain).toString().replace(" ", "");
    var variant = $(id).val();

    if (variant != undefined ) {
      $('#variant_id').val(variant);
    }else if (chain != '') {
      variant = $('#'+chain).val();

      $('#variant_id').val(variant);
    }else if($('#DefaultTitle-').val() != undefined ) {
      $('#variant_id').val($('#DefaultTitle-').val());
    }
};

function select_moon_phase(date) {
  return moon_phase_data[date];
}
