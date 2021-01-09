//VARIABLES
let underTablet = window.matchMedia("(max-width: 769px)");
function responsiveNav(x) {
  if (x.matches) {
    let nav = document.getElementById("nav");
    let margin = "-" + nav.offsetHeight + "px";
    nav.style.marginTop = margin;
    nav.classList.add("conditionalClose")
  }
}

function openNav(object) {
  if (underTablet.matches) {
    let helper = object.offsetHeight;
    let margin = "-" + helper + "px";
    var slideDown = new KeyframeEffect(
      object,
      [
        {marginTop: margin},
        {marginTop: "0px"},
      ],
      {duration: 500, fill: 'forwards', ease: 'ease-in-out'}
    );
    var navSlideDown = new Animation(slideDown);
    navSlideDown.play();
  };
  object.classList.replace("conditionalClose", "conditionalOpen");
  object.classList.add("is-active");
}

function closeNav(object) {
  if (underTablet.matches) {
    let helper = object.offsetHeight;
    let margin = "-" + helper + "px";
    var slideUp = new KeyframeEffect(
      object,
      [
        {marginTop: "0px"},
        {marginTop: margin},
      ],
      {duration: 500, fill: 'forwards', ease: 'ease-in-out'}
    );
    var navSlideUp = new Animation(slideUp);
    navSlideUp.play();
  };
  object.classList.replace("conditionalOpen", "conditionalClose");
  object.classList.remove("is-active");
}

// From https://bulma.io/documentation/components/navbar/
document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll("#burger"), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById("nav");
        el.classList.toggle("is-active");
        $target.classList.remove("hideMe");
        if ($target.classList.contains("conditionalClose")) {
          openNav($target);
        } else if ($target.classList.contains("conditionalOpen")) {
          closeNav($target);
        } else {
          $target.classList.add("conditionalClose");
        }
      });
    });
  }
});

responsiveNav(underTablet);
underTablet.addListener(responsiveNav);
