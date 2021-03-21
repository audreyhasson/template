

// remember nav state on learn page
function checkNav(bigNav) {
  if (bigNav.classList.contains("conditionalOpen")) {
    sessionStorage.setItem('navState', 'open');
  } else if (bigNav.classList.contains("conditionalClose")) {
    sessionStorage.setItem('navState', 'closed');
  };
}

let innerNav = document.getElementsByClassName("thesis-links");


function rememberNav() {
  let bigState = sessionStorage.getItem('navState');
  let bigNav = document.getElementById("nav");
  if (bigState === 'open') {
    bigNav.classList.add("conditionalClose", "hideMe");
  }
}

//responsiveness
let underTablet = window.matchMedia("(max-width: 769px)");
function responsiveNav(x) {
  if (x.matches) {
    let nav = document.getElementById("nav");
    nav.classList.add("conditionalClose", "hideMe");
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
      {duration: 400, fill: 'forwards', ease: 'ease-in-out'}
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
      {duration: 400, fill: 'forwards', ease: 'ease-in-out'}
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
        checkNav($target);
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

document.addEventListener("DOMContentLoaded", () => {
  responsiveNav(underTablet);
  rememberNav();
});

let backBtn = document.getElementsByClassName("getUrl");
let lastPage = document.referrer;
function bibliography() {
  Array.prototype.forEach.call(backBtn, i => {
    i.setAttribute("href", lastPage);
  })
};



bibliography();
