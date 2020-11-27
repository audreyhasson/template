// From https://bulma.io/documentation/components/navbar/
document.addEventListener("DOMContentLoaded", () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll("#burger"), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener("click", () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById("nav");

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.remove("hideMe");
        
        if ($target.classList.contains("conditionalClose")) {
          $target.classList.replace("conditionalClose", "conditionalOpen");
          $target.classList.add("is-active");
        } else {
          $target.classList.replace("conditionalOpen", "conditionalClose");
          $target.classList.remove("is-active");
        }
      });
    });
  }

});

//slide nav open
