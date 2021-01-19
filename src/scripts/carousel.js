$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    center: true,
    items: 3,
    autoplay: true,
    autoplayTimeout: 3500,
    lazyLoad: true,
    responsiveClass: true,
    responsive : {
      0:{
        items: 1
      },
      769:{
        items: 3,
      },
      1023:{
        items: 3,
      },
    },
  });
});
