var sw = $(window).width();
var sh = $(window).height();

$(window).on('load', function () {

    setTimeout(function() {
        $(".loader-first").fadeOut("slow");
        $('html').removeClass('loadjs');
    }, 1000);

    if($(document).find('img').hasClass('svg-convert')) {
        $('.svg-convert').svgConvert({onComplete: function() {
            }
        });
    }

    setTimeout(function () {

        /* ---------------- In View Animation -------------------- */
        $('.animate').bind('inview', function (event, isInView) {
            if (isInView) {
                var animate = $(this).attr('data-animation');
                var speedDuration = $(this).attr('data-duration');
                var $t = $(this);
                setTimeout(function () {
                    $t.removeClass('animate');
                    $t.addClass(animate + ' animated');
                }, speedDuration);
            }
        });

        $('img').each(function () {
            var $element = $(this);
            if (sw > 767) {
                if ($element[0].hasAttribute('data-desktop-src')) {
                    var imageUrl = $element.attr("data-desktop-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-desktop-src');
                    $element.removeAttr('data-mobile-src');
                } else if ($element[0].hasAttribute('data-both-src')) {
                    var imageUrl = $element.attr("data-both-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-both-src');
                }
            } else {
                if($element[0].hasAttribute('data-mobile-src')) {
                    var imageUrl = $element.attr("data-mobile-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-desktop-src');
                    $element.removeAttr('data-mobile-src');
                } else if ($element[0].hasAttribute('data-both-src')) {
                    var imageUrl = $element.attr("data-both-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-both-src');
                }
            }
        });

        $('.js-hero .hero__img').each(function () {
            var $element = $(this);
            if (sw > 767) {
                if ($element[0].hasAttribute('data-desktop-bg')) {
                    var imageUrl = $element.attr("data-desktop-bg");
                    $element.attr("style", "background-image:url(" + imageUrl + ")");
                    $element.removeAttr('data-desktop-bg');
                    $element.removeAttr('data-mobile-bg');
                }
            } else {
                if($element[0].hasAttribute('data-mobile-bg')) {
                    var imageUrl = $element.attr("data-mobile-bg");
                    $element.attr("style", "background-image:url(" + imageUrl + ")");
                    /*$element.removeAttr('data-bgimg');
                    $element.removeAttr('data-bgimg-mob');*/
                }
            }
        });

    }, 200);

});


$(document).ready(function() {

    if (sw > 1025) {
        if ((sw < 1400) && (sh >900)) {

        } else {
            fontResizer();
        }
    }

    $(".submenu").mouseover(function(){
        if(sw > 1025) {
            $(this).find('.meagamenu_main').addClass('active');
        }
    });
    $(".submenu").mouseout(function(){
        if(sw > 992) {
            $(this).find('.meagamenu_main').removeClass('active');
        }
    });

    $('.submenu .chevron').click(function() {
        if ((sw < 1100) || ((sw < 1400) && (sw > 1300) && (sh > 900))) {
            var $sthis = $(this).parent().find('.mega--menu');
            if ($sthis.is(":visible")) {
                $sthis.slideUp();
            } else {
                $('.mega--menu').slideUp();
                $sthis.slideDown();
            }
        } else {
            $(this).parent().find('.meagamenu_main').addClass('active');
        }
    });

    $('.menu__sign').click(function() {
        if(sw < 992) {
            var $sthis = $(this).parent().find('.mega--menu');
            if ($sthis.is(":visible")) {
                $sthis.slideUp();
            } else {
                $('.mega--menu').slideUp();
                $sthis.slideDown();
            }
            if($(this).hasClass('open')){
                $('.menu__sign').removeClass('open');
            }else{
                $('.menu__sign').removeClass('open');
                $(this).addClass('open');
            }
        } else {
            $(this).parent().find('.meagamenu_main').addClass('active');
        }

    });

    var path = window.location.pathname.split("/").pop();
    var target = $('.navigation a[href="/' + path + '"]');
    target.addClass('active');

    setTimeout(function () {
        var interleaveOffset = 0.5;

        var swiperOptions = {
            loop: true,
            speed: 1000,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".js-heronav .swiper-button-next",
                prevEl: ".js-heronav .swiper-button-prev"
            },
            // autoplay: {
            //     disableOnInteraction: false,
            //     delay: 5000,
            // },
            on: {
                progress: function() {
                    var hswiper = this;
                    for (var i = 0; i < hswiper.slides.length; i++) {
                        var slideProgress = hswiper.slides[i].progress;
                        var innerOffset = hswiper.width * interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        hswiper.slides[i].querySelector(".hero__img").style.transform =
                            "translate3d(" + innerTranslate + "px, 0, 0)";
                    }
                },
                touchStart: function() {
                    var hswiper = this;
                    for (var i = 0; i < hswiper.slides.length; i++) {
                        hswiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function(speed) {
                    var hswiper = this;
                    for (var i = 0; i < hswiper.slides.length; i++) {
                        hswiper.slides[i].style.transition = speed + "ms";
                        hswiper.slides[i].querySelector(".hero__img").style.transition =
                            speed + "ms";
                    }
                }
            }
        };

        var heroSl = new Swiper(".js-hero .swiper-container", swiperOptions);

       // if ($(document).find('div').hasClass('mySwiper')) {
            var tokenomics = new Swiper('.mySwiper', {
                slidesPerView: 3,
                observer: true,
                observeParents: true,
                allowTouchMove:false,
                loop: true,
                //spaceBetween: 15,
                //effect: 'fade',
                speed: 800,
                autoplay: {
                    pauseOnMouseEnter: false,
                    delay: 4000,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        //}

        // if ($(document).find('div').hasClass('latest__news')) {
        //     var exclusivelng = new Swiper('.latest__news .swiper-container', {
        //         slidesPerView: '7',
        //         observer: true,
        //         observeParents: true,
        //         allowTouchMove:true,
        //         loop:true,
        //         spaceBetween: 50,
        //         speed: 4000,
        //         autoplay: {
        //             delay: 0,
        //             disableOnInteraction: false,
        //         },
        //         breakpoints: {
        //             // when window width is <= 499px
        //             992: {
        //                 slidesPerView: 3,
        //             },
        //             // when window width is <= 499px
        //             767: {
        //                 slidesPerView: 2,
        //             },
        //         }
        //     });
        // }

        // $('.freeSlider .swiper-container').each(function() {
        //     var swiperS = new Swiper(this, {
        //         slidesPerView: 'auto',
        //         spaceBetween: 20,
        //         freeMode: true,
        //         freeModeMomentum: true,
        //         freeModeMomentumBounceRatio: 0,
        //         preventInteractionOnTransition: true,
        //         speed: 5000,
        //         loop: true,
        //         autoplay: {
        //             enable: true,
        //             disableOnInteraction: false,
        //             delay: 0
        //         }
        //     });
        // });


        $('.shop__wrap .swiper-container').each(function (i) {
            var myProduct = new Swiper($(this)[0],{
                slidesPerView: '1',
                observer: true,
                observeParents: true,
                allowTouchMove:true,
                loop:true,
                speed: 600,
                pagination: {
                    el: $(".slider__controls .slider__pagination")[i],
                    clickable: true,
                },
                navigation: {
                    nextEl: $(".slider__controls .swiper-button-next")[i],
                    prevEl: $(".slider__controls .swiper-button-prev")[i],
                },
            });
        });





    }, 2000);

    if ($(document).find('div').hasClass('hslider1')) {
        var introdesc = new Swiper('.hslider1 .swiper-container', {
            observer: true,
            observeParents: true,
            allowTouchMove:true,
            centeredSlides:true,
            loop:true,
            spaceBetween: 15,
            freeMode: true,
            speed: 3000,
            //effect: 'fade',
            autoplay: {
                delay:.01,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            navigation: {
                nextEl: ".js-intro .swiper-button-next",
                prevEl: ".js-intro .swiper-button-prev"
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
        });
    }
    if ($(document).find('div').hasClass('hslider2')) {
        var introdesc = new Swiper('.hslider2 .swiper-container', {
            observer: true,
            observeParents: true,
            allowTouchMove:true,
            centeredSlides:true,
            loop:true,
            spaceBetween: 15,
            freeMode: true,
            speed: 4000,
            //effect: 'fade',
            autoplay: {
                delay:.01,
                disableOnInteraction: false,
                reverseDirection: true
            },
            slidesPerView: 'auto',
            navigation: {
                nextEl: ".js-intro .swiper-button-next",
                prevEl: ".js-intro .swiper-button-prev"
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
        });
    }


    $('.toggle-menu').click(function () {
        //$('html').toggleClass('open-menu');
        $(this).toggleClass('open');
        $('.navigation').toggleClass('active');
    });

    $('.head__image a').click(function () {
        $(".head__menu").slideToggle();
    });

    $('.business__button a').click(function () {
        $('.form--section').css( { "display" : "block" } );
        $('.business--section').css( { "display" : "none" } );
    });

    $('.form__cross a').click(function () {
        $('.form--section').css( { "display" : "none" } );
        $('.business--section').css( { "display" : "block" } );
    });

    $('.offer__btn a').click(function () {
        $(this).parent().parent().parent().addClass('open_auction');
    });

    $('.showBtn').click(function() {
        //$('.hideme').hide();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.hideme').slideUp();
        } else {
            $('.hideme').slideUp();
            $('.showBtn').removeClass('active');
            $(this).addClass('active');
            $(this).next().filter('.hideme').slideDown();
        }
    });


    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            // window.location.hash = target;
        });
    });

    $('.navigation a').click(function () {
        $('.navigation').removeClass('active');
        $('.toggle-menu').removeClass('open');
    });

    $('.hover__text').mouseenter(function () {
        $(this).text('Comingsoon');
    });
    $('.hover__text').mouseleave(function () {
        $(this).text('Bull’s Arena');
    });

});



function fontResizer() {
    var perc = parseInt(sw)/120;
    $('body').css('font-size', perc);
}

$(window).on('resize orientation', function() {
    sw = $(window).width();
    sh = $(window).height();
    if (sh < 450 && sw > 480 && sw < 820) {
        $('#portrait-warnning').css('display', 'flex');
    } else {
        $('#portrait-warnning').css('display', 'none');
    }

    setTimeout(function () {
        if (sw > 1025) {

            if ((sw < 1400) && (sw > 1300) && (sh > 900)) {

            } else {
                fontResizer();
            }
        }
    }, 500);
});


$(window).scroll(function(){
    if ($(this).scrollTop() > 50) {
        $('header').addClass('active');
    } else {
        $('header').removeClass('active');
    }
});


$(function() {

    var targetDate  = new Date(Date.UTC(2017, 3, 01));
    var now   = new Date();

    window.days = daysBetween(now, targetDate);
    var secondsLeft = secondsDifference(now, targetDate);
    window.hours = Math.floor(secondsLeft / 60 / 60);
    secondsLeft = secondsLeft - (window.hours * 60 * 60);
    window.minutes = Math.floor(secondsLeft / 60 );
    secondsLeft = secondsLeft - (window.minutes * 60);
    console.log(secondsLeft);
    window.seconds = Math.floor(secondsLeft);

    startCountdown();
});
var interval;

function daysBetween( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/one_day);
}

function secondsDifference( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = date2_ms - date1_ms;
    var difference = difference_ms / one_day;
    var offset = difference - Math.floor(difference);
    return offset * (60*60*24);
}



function startCountdown() {
    $('#input-container').hide();
    $('#countdown-container').show();

    displayValue('.js-days', window.days);
    displayValue('.js-hours', window.hours);
    displayValue('.js-minutes', window.minutes);
    displayValue('.js-seconds', window.seconds);

    interval = setInterval(function() {
        if (window.seconds > 0) {
            window.seconds--;
            displayValue('.js-seconds', window.seconds);
        } else {
            // Seconds is zero - check the minutes
            if (window.minutes > 0) {
                window.minutes--;
                window.seconds = 59;
                updateValues('minutes');
            } else {
                // Minutes is zero, check the hours
                if (window.hours > 0)  {
                    window.hours--;
                    window.minutes = 59;
                    window.seconds = 59;
                    updateValues('hours');
                } else {
                    // Hours is zero
                    window.days--;
                    window.hours = 23;
                    window.minutes = 59;
                    window.seconds = 59;
                    updateValues('days');
                }
                // $('#js-countdown').addClass('remove');
                // $('#js-next-container').addClass('bigger');
            }
        }
    }, 1000);
}


function updateValues(context) {
    if (context === 'days') {
        displayValue('.js-days', window.days);
        displayValue('.js-hours', window.hours);
        displayValue('.js-minutes', window.minutes);
        displayValue('.js-seconds', window.seconds);
    } else if (context === 'hours') {
        displayValue('.js-hours', window.hours);
        displayValue('.js-minutes', window.minutes);
        displayValue('.js-seconds', window.seconds);
    } else if (context === 'minutes') {
        displayValue('.js-minutes', window.minutes);
        displayValue('.js-seconds', window.seconds);
    }
}

function displayValue(target, value) {
    var newDigit = $('<span></span>');
    $(newDigit).text(pad(value))
        .addClass('new');
    $(target).prepend(newDigit);
    $(target).find('.current').addClass('old').removeClass('current');
    setTimeout(function() {
        $(target).find('.old').remove();
        $(target).find('.new').addClass('current').removeClass('new');
    }, 900);
}

function pad(number) {
    return ("0" + number).slice(-2);
}






$(".circle_percent").each(function() {
    var $this = $(this),
        $dataV = $this.data("percent"),
        $dataDeg = $dataV * 3.6,
        $round = $this.find(".round_per");
    $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
    $this.append('<div class="circle_inbox"><span class="percent_text"></span></div>');
    $this.prop('Counter', 0).animate({Counter: $dataV},
        {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $this.find(".percent_text").text(Math.ceil(now)+"%");
            }
        });
    if($dataV >= 51){
        $round.css("transform", "rotate(" + 360 + "deg)");
        setTimeout(function(){
            $this.addClass("percent_more");
        },1000);
        setTimeout(function(){
            $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
        },1000);
    }
});






