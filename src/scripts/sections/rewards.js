
var icons = [
  'shop_big_ico',
  'point_transfer_ico',
  'present_ico',
  'review_ico',
  'facebook_ico',
  'share-ico',
  'instagram_ico'
]
$(document).ready(function () {
  var i = 0;
  var inter_val = setInterval(() => {
   if (!$('#rp-campaigns-region div').hasClass('rewards-page-preloader')) {
    if (!$('#rp-campaigns-region div').hasClass('campaign')) {
      var i = 0;
      $('#rp-campaigns-region .swell-unauthenticated').each(function () {
        $(this).find('.icon-holder').html('<img src="https://cdn.shopify.com/s/files/1/2486/3224/t/224/assets/'+icons[i]+'.svg?v=4321893028173185640">');
        i+=1;
      })
    }else{
      var i  = 0
      $('#rp-campaigns-region .campaign').each(function () {
        $(this).find('.icon-holder').html('<img src="https://cdn.shopify.com/s/files/1/2486/3224/t/224/assets/'+icons[i]+'.svg?v=4321893028173185640">');
        i+=1;
      })
    }
     if ($(window).innerWidth() > 658) {
       var html = $(".refer-block").html();
       $('#rp-campaigns-region div.swell-unauthenticated:nth-child(4)').after(html)
       $('#rp-campaigns-region div.campaign:nth-child(4)').after(html)
     } else {
       $(".refer-block").removeClass('hide');
     }
   }
   if ($('.swell-free-product-list').find("li").hasClass('swell-redemption-product')) {

     $('.swell-free-product-list').addClass('owl-carousel');
     $('.swell-free-product-list').addClass('owl-theme');
     $('.swell-free-product-list').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      responsive:{
        0:{
          items:2,
          mergeFit:true
        },
        678:{
          items:3,
          mergeFit:true
        },
        1000:{
          items:4,
          mergeFit:false
        }
      }
    });
   }

   if (!$('#rp-campaigns-region div').hasClass('rewards-page-preloader') && !$('#redeem-options-region div').hasClass('rewards-page-preloader')) {
    clearInterval(inter_val);
   }
   $('.login-btn a').each(function() {
    var href = $(this).attr('href')+'?checkout_url=/pages/rewards';
    $(this).attr('href', href);
   });
 }, 1000);
 $(document).on('click', '.swell-free-product-list .swell-redemption-product', function(){
   if (!$('.swell-free-product-list').hasClass('logged-in')) {
     window.location = '/account/login?checkout_url=/pages/rewards';
   }
 })

 
});
