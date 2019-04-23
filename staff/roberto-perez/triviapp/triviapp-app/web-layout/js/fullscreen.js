const animationTo = document.getElementById("animation-to");
const animationFrom = document.getElementById("animation-from");
const expandButton = document.querySelector('.expand_button');
const hostGame = document.querySelector('.host-game');

expandButton.addEventListener('click', function() {
  if (expandButton.classList.contains("animated")) {
    document.exitFullscreen()
    expandButton.classList.remove("animated");
    animationFrom.beginElement();
  } else {
    hostGame.requestFullscreen()
    expandButton.classList.add("animated");
    animationTo.beginElement();
  }

}, false);