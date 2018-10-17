$(document).ready(function() {
  //кастомный селект
  setTimeout(function() {
    $('.js-styler').styler({
      selectSmartPositioning: false
    });
  }, 100);

  //слайдер профилей
  if ($('.js-profiles').length) {
    $('.js-profiles').slick({
      autoplay: false,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      prevArrow: '<button class="slick-arrow slick-arrow--prev" aria-label="Назад" type="button"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_left"/></svg></button>',
      nextArrow: '<button class="slick-arrow slick-arrow--next" aria-label="Вперед" type="button"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_right"/></svg></button>',
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  //слайдер карточек
  if ($('.js-features').length) {
    $('.js-features').slick({
      autoplay: false,
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 767,
          settings: "unslick"
        },
        {
          breakpoint: 590,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });
  }

  //слайдер объектов
  if ($('.js-objects').length) {
    if($('body').width() > 567){
      $('.js-objects').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        prevArrow: '<button class="slick-arrow slick-arrow--prev" aria-label="Назад" type="button"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_left"/></svg></button>',
        nextArrow: '<button class="slick-arrow slick-arrow--next" aria-label="Вперед" type="button"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_right"/></svg></button>',
      });
    }
  }

  //слайдер отзывов
  if ($('.js-reviews').length) {
    $('.js-reviews').slick({
      adaptiveHeight: true,
      autoplay: false,
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            prevArrow: '<button class="slick-arrow slick-arrow--prev" aria-label="Назад" type="button"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_left"/></svg></button>',
            nextArrow: '<button class="slick-arrow slick-arrow--next" aria-label="Вперед" type="button"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_right"/></svg></button>',
            arrows: true,
            dots: false
          }
        }
      ]
    });
  }

  //изменение шапки при скролле
  $(window).scroll(function () {
    if ($(this).scrollTop() > $('.header').height()) {
      $('.header').addClass('scrolled');
    } else {
      $('.header').removeClass('scrolled');
    }
  });

  //скролл меню
  $(".header__menu-list").on("click", "a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href');
    var offset = $('.header__inner').outerHeight();
		var top = $(id).offset().top;
    var result = top - offset;
    $('body,html').animate({
      scrollTop: result
    }, 500, function() {
      $(".js-menu-opener").removeClass("is-active");
      $("body").removeClass("overflow");
      $(".header__menu").removeClass("is-open");
      var offset = $('.header__inner').outerHeight();
      var result = top - offset;
      $('body,html').animate({
        scrollTop: result
      }, 0);
    });
	});

  //открытие/закрытие меню
  $(".js-menu-opener").click(function() {
    $(this).toggleClass("is-active");
    $("body").toggleClass("overflow");
    $(".header__menu").toggleClass("is-open");
    return false;
  });

  //переключение профиля
  $(".calc__window-block-inner").click(function() {
    $(".calc__window-block-inner").removeClass("is-active");
    $(this).addClass("is-active");
    $('.js-calc__form-image').attr('src', $(this).attr('data-image'));
    return false;
  });
});
