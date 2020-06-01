$.cookie('SameSite', 'Lax');
setTimeout(() => {
    $('.loader_wrapper').hide();
    $('body').removeClass('stop-scroll');
}, 3000);
$(".side-menu .cart").click(function(e){
    $('body').addClass('stop-scroll');
    e.preventDefault();
    $(".dark-bg").show()
    $(".mini-cart").addClass("active");
})

$(".close_btn").click(function(){
    $(".dark-bg").hide()
    $(this).parent().parent().removeClass("active");
    $(this).parent().removeClass("active");
    $('body').removeClass('stop-scroll');
})


$(".search-button").mouseenter(function () { 
    $(".search_menu").show();
});

$(".search_menu").mouseenter(function () { 
    $(".search_menu").show();
});

$(".side-menu").mouseleave(function () { 
    $(".search_menu").hide();
});

$(".search_menu").mouseleave(function () { 
    $(".search_menu").hide();
});


$(".nav-btn").click(function(){
    if($(".menu ul.mobile-menu").hasClass("show")){
        $(".menu ul.mobile-menu").removeClass("show"); 
        $('body').removeClass('stop-scroll');
    }else{
        $(".menu ul.mobile-menu").addClass("show"); 
        $('body').addClass('stop-scroll');
    }
});

$(".inner_div input").change(function () {
    var q = $(this).val();
    location = "/pages/search-results-page?q="+ q;
})

$(".sub-link-button").click(function(e){
    if( $(this).parent().find('nav').hasClass('sub-link') ){
        e.preventDefault();
        $(".sub-link").slideUp();
        $(this).parent().find("nav.sub-link").slideDown();
    }else{
        window.location = $(this).attr('href');
    }
});

$(".child-link-button").click(function(e){
    if( $(this).parent().find('ul').hasClass('child-link') ){
        e.preventDefault();
        $(".child-link").hide();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().find("ul.child-link").slideUp('slow');
        }else{
            $(this).addClass('active');
            $(this).parent().find("ul.child-link").slideDown('slow');
        }
        
    }else{
        window.location = $(this).attr('href');
    }
});

$(".modal_btn").click(function(e){
    e.preventDefault();
    var target = "#"+$(this).attr("data-target");
    
    $(target).addClass("active");
    $(".dark-bg").show();
    $('body').addClass('stop-scroll');  
});

$(".dark-bg").click(function(){
    $(".close_btn").trigger("click");
    $(".close").trigger("click");
})
