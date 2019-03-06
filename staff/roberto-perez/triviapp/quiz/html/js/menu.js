(function() {
  const body = document.querySelector("body");



  body.addEventListener(
    "click",
    Event => {

      // console.log(Event.srcElement);
      // if ( matches.call( Event.target, 'button.header__search-button') ) {
      // if (Event.target.matches("button.header__search-button")) {
        console.log("xDDD");
        // proceed
      // }
    },
    false
  );

  // const headerMenuButton = document.querySelector(".header__menu");
  // const wrapper = document.querySelector(".wrapper");
  // const main = document.querySelector(".main");
  // const sidebar = document.querySelector(".sidebar");

  // headerMenuButton.addEventListener("click", Event => {
  //   wrapper.classList.toggle("wrapper--show");
  //   main.classList.toggle("main--hide");
  //   sidebar.classList.toggle("sidebar--show");
  // });
})();

// (function() {
//   const headerMenuButton = document.querySelector(".header__menu");
//   const main = document.querySelector(".main");
//   const sidebar = document.querySelector(".sidebar");
//   const sidebarOverlay = document.querySelector(".wrapper");

//   headerMenuButton.addEventListener("click", Event => {
//     main.classList.toggle("main--hide");
//     sidebar.classList.toggle("sidebar--show");
//     sidebarOverlay.classList.toggle("wrapper--show");
//   });

//   sidebarOverlay.addEventListener("click", Event => {
//     main.classList.toggle("main--hide");
//     sidebar.classList.toggle("sidebar--show");
//     sidebarOverlay.classList.toggle("wrapper--show");
//   });

// })();
