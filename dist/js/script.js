// $(document).ready(function(){
// 	$('.carousel__inner').slick({
// 		speed: 1000,
// 		// adaptiveHeight: true,
// 		prevArrow: '<button type="button" class="slick-prev"><img src="icons/prevarrow.png" alt=""></button>',
// 		nextArrow: '<button type="button" class="slick-next"><img src="icons/nextarrow.png" alt=""></button>',
// 		responsive: [
// 			{
// 			  breakpoint: 991,
// 			  settings: {
// 				arrows: false,
// 				dots: true
// 			  }
// 			},
// 			{
// 			  breakpoint: 480,
// 			  settings: {
// 				arrows: false,
// 				dots: true
// 			  }
// 			}
// 		  ]
// 	  });
//   });

// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
// 	autoplay: false,
// 	controls: false,
// 	nav: false

//   });

// document.querySelector('.prev').addEventListener('click', function () {
// 	slider.goTo('prev');
// });
// document.querySelector('.next').addEventListener('click', function () {
// 	slider.goTo('next');
// });
'use strict';
$(document).ready(function(){
	$('.owl-carousel').owlCarousel({
    loop: true,
    center: true,
    nav: false,	
    smartSpeed:1150,
    responsive:{ 
        0:{
            center: true,
            items:1            
        }, 
        500:{
            items: 1
        },
        1200:{
            loop: true,
            items: 1
        }
        }
    });
	
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    const owl = $('.owl-carousel');
    $('.prev').click(function() {
        owl.trigger('prev.owl.carousel');
    })

    $('.next').click(function() {
        owl.trigger('next.owl.carousel');
    })

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        
    });
 

    $('.button_mini').each(function(i){
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "ВВЕДИТЕ СВОЁ ИМЯ",
                    minlength: jQuery.validator.format("Введите {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Плз, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
    
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //pageup and  
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
        
    });
    //Smooth scroll 
    $("a[href^='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

    let map = document.querySelector('#map-wrap iframe');
    document.addEventListener('click', function(e) {        
        if(e.target.id === 'map-wrap') {
          map.style.pointerEvents = 'all';
          return false;
        } 
        map.style.pointerEvents = 'none';        
      })
});
