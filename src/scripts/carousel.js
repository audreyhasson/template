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
    responsiveClass: true,
    responsive : {
      0:{
        items: 1
      },
      768:{
        items: 2,
      },
      1023:{
        items: 3,
      },
    },
  });
});
