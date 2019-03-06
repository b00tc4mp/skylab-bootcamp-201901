(function() {
  const userProfileButton = document.querySelector(".user-profile__button");
  const userProfile = document.querySelector(".user-profile");
  const userDropdown = document.querySelector(".user-dropdown");

  userProfileButton.addEventListener("click", Event => {
    userProfile.classList.toggle("user-profile--open");
    userDropdown.classList.toggle("user-dropdown--open");
  });
})();
