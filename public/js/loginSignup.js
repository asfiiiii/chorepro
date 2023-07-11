const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const head = document.querySelector(".head");
const img = document.querySelector(".img");
const account = document.querySelector(".account");
const greet = document.querySelector(".greet");
const slider = document.querySelector(".slider");
const logging = document.querySelector(".logging");
const signing = document.querySelector(".signing");

const text_changer = () => {
  if (head.innerText === "Welcome Back Sire!") {
    head.innerText = "Lets Create an Account";
    greet.innerText =
      "Just Enter your Username,Email and Password and we are Done ";
    img.src = "images/2.png";
    account.innerText = "Alread have an account?";
  } else {
    head.innerText = "Welcome Back Sire!";
    greet.innerText =
      "We ensure the safety and secutiry of your thoughts and intrest";
    img.src = "images/1.png";
    account.innerText = "Dont have an Account!? Lets make one";
  }
};

const text_changer_rev = () => {
  if (head.innerText === "Lets Create an Account") {
    head.innerText = "Welcome Back Sire!";
    greet.innerText =
      "We ensure the safety and secutiry of your thoughts and intrest ";
    img.src = "images/1.png";
    account.innerText = "Dont have an Account!? Lets make one";
  } else {
    head.innerText = "Lets Create an Account";
    greet.innerText =
      "Just Enter your Username,Email and Password and we are Done ";
    img.src = "images/2.png";
    account.innerText = "Alread have an account?";
  }
};

btn1.addEventListener("click", () => {
  slider.classList.toggle("slider_back");
  text_changer();
  logging.classList.toggle("active-log");
  signing.classList.toggle("active-sign");
});
btn2.addEventListener("click", () => {
  slider.classList.toggle("slider_back");
  text_changer_rev();
  logging.classList.toggle("active-log");
  signing.classList.toggle("active-sign");
});
btn3.addEventListener("click", () => {
  slider.classList.toggle("slider_back");
  text_changer();
});
