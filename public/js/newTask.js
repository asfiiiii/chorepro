const overlay = document.querySelector(".overlay");
const openButton = document.querySelector(".open-btn");
const closeButton = document.querySelector(".close-btn");

// Function to show the overlay and fragment
function showFragment() {
  overlay.style.display = "block";
}

// Function to hide the overlay and fragment
function hideFragment() {
  overlay.style.display = "none";
}

openButton.addEventListener("click", showFragment);
closeButton.addEventListener("click", hideFragment);

// const btn1 = document.querySelector(".open");
// const btn2 = document.querySelector(".close");
// const menu = document.querySelector(".dropmenu");

// btn1.addEventListener("click", () => {
//   alert("he");
// });
// btn2.addEventListener("click", () => {
//   menu.classList.add("open_it");
// });
// btn1.addEventListener("click", () => {
//   btn2.cl
// });
