
$(document).ready(function () {
    $('.sidebar .loading').show();
    var getuppsel = setInterval(() => {
        if($('#orderbump').html() != ''){
            setTimeout(() => {
                var height = ($('.order-summary__section--swell').innerHeight()+$('.order-summary__section--discount').innerHeight() + $('.order-summary__section--total-lines').innerHeight()+ 90)*(-1);
                $('#orderbump').css('margin-top', height);
                $('.sidebar .loading').fadeOut();
                clearInterval(getuppsel);
            }, 500);
        }
    }, 500);
    if($('body').innerWidth() < 769){
        $('.product_date').addClass('order-summary--is-collapsed');
        $('.desktopIcon').addClass('order-summary--is-collapsed');
    }
    $('.order-summary-toggle').click(function () {
        if($('.product_date').hasClass('order-summary--is-collapsed')){
            $('.product_date').removeClass('order-summary--is-collapsed');
            $('.desktopIcon').removeClass('order-summary--is-collapsed');
        }else{
            $('.product_date').addClass('order-summary--is-collapsed');
            $('.desktopIcon').addClass('order-summary--is-collapsed');
        }
    })
})