(function() {
  const searchButtons = document.querySelectorAll(".toggle-search");
  const wrapper = document.querySelector(".wrapper");
  const searchContent = document.querySelector(".search__content");
  const searchInput = document.querySelector(".search__input");

  [].forEach.call(searchButtons, element => {
    element.addEventListener("click", Event => {
      wrapper.classList.toggle("wrapper--show");
      searchContent.classList.toggle("search__content--open");
      searchInput.value = "";
    });
  });
})();

// (function() {
//   const toggleSearchButton = document.querySelectorAll(".toggle-search");
//   const searchOverlay = document.querySelector(".wrapper");
//   const searchContent = document.querySelector(".search__content");
//   const searchInput = document.querySelector(".search__input");

//   [].forEach.call(toggleSearchButton, element => {
//     element.addEventListener("click", Event => {
//       searchOverlay.classList.toggle("wrapper--show");
//       searchContent.classList.toggle("search__content--open");
//       searchInput.value = '';
//     });
//   });
// })();
